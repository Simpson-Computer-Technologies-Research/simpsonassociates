import { context, publicAgentSearchConfig, verifyAdmin } from "@/app/lib/mongo";
import { AgentsCache } from "@/app/lib/cache";
import { generateUserId } from "@/app/lib/auth";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Middlewares to limit the number of requests
 */
const middlewares = getMiddlewares({ limit: 10, delayMs: 0 }).map(
  applyMiddleware,
);

/**
 * Middleware to limit the number of requests
 */
const rateLimit = async (req: any, res: any) => {
  try {
    await Promise.all(middlewares.map((mw: any) => mw(req, res)));
  } catch (_err: any) {
    return true;
  }
};

// Create a new agents cache
const cache = new AgentsCache();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (await rateLimit(req, res)) {
    return res.status(429).send(`Too many requests`);
  }

  // Getting agents
  if (req.method === "GET") {
    return await getAgents(req, res);
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isAdmin = await verifyAdmin(authorization);
  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "POST":
      return await addAgent(req, res);
    case "DELETE":
      return await deleteAgent(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// Get the agents from the database and return them as JSON
const getAgents = async (_: any, res: any) => {
  let hasResponded: boolean = false;

  if (cache.isCached()) {
    res.status(200).json({ message: "Success", result: cache.get() });
    hasResponded = true;
  }

  await context(async (database) => {
    const collection = database.collection("agents");

    await collection
      .find()
      .project(publicAgentSearchConfig)
      .toArray()
      .then((result) => {
        cache.update(result);
        if (!hasResponded) {
          res.status(200).json({ message: "Success", result });
        }
      })
      .catch((error) => {
        if (!hasResponded) res.status(500).json({ message: error.message });
      });
  }).catch((error) => {
    if (!hasResponded) res.status(500).json({ message: error.message });
  });
};

/**
 * Add an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const addAgent = async (req: any, res: any) => {
  if (!isValidAgentBody(req.body)) {
    return res
      .status(400)
      .json({ message: "Missing required fields", result: null });
  }

  await context(async (database) => {
    const collection = database.collection("agents");

    // Add the agent to the database
    const userId: string = await generateUserId();
    await collection
      .insertOne({
        ...req.body,
        user_id: userId,
        hidden: false,
      })
      .then((result) => {
        if (!result.acknowledged) {
          return res
            .status(409)
            .json({ message: "Failed to add agent", result: null });
        }

        cache.add_agent({ ...req.body, user_id: userId });
        res.status(200).json({ message: "Success", result });
      });
  }).catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Delete an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const deleteAgent = async (req: any, res: any): Promise<void> => {
  const { agent_id } = req.body;
  if (!agent_id) {
    return res
      .status(400)
      .json({ message: "Missing required fields", result: null });
  }

  await context(async (database) => {
    const collection = database.collection("agents");

    // Check if the agent already exists
    await collection.findOne({ user_id: agent_id }).then(async (agent) => {
      if (!agent) {
        res.status(409).json({ message: "Agent does not exist", result: null });
        return;
      }

      // Delete the agent from the database
      await collection.deleteOne({ user_id: agent_id }).then((result) => {
        if (result.deletedCount === 0) {
          return res
            .status(409)
            .json({ message: "Failed to delete agent", result: null });
        }

        cache.delete_agent(agent_id);
        res.status(200).json({ message: "Success", result });
      });
    });
  }).catch((error) => res.status(500).json({ message: error.message }));
};

// Check if the body of the request is valid
const isValidAgentBody = (body: any) =>
  body.name &&
  body.email &&
  body.license &&
  body.title &&
  body.photo &&
  body.lang &&
  body.priority !== undefined &&
  body.team &&
  body.region &&
  body.region.location &&
  body.region.lat !== undefined &&
  body.region.lon !== undefined &&
  body.permissions &&
  body.permissions.length > 0;
