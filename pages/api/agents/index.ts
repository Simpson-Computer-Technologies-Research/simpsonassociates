import { context, publicAgentSearchConfig, verifyAdmin } from "@/app/lib/mongo";
import { AgentsCache } from "@/app/lib/cache";
import { generateId } from "@/app/lib/auth";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, DeleteResult, Document } from "mongodb";
import { uploadAgentPhotoGCP, deleteAgentPhotoGCP } from "@/app/lib/gcp";

const defaultAgentHeadshotPhoto: string =
  "/images/default_agent_headshot_primary.png";

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
  } catch (_: any) {
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
    return res.status(429).send("Too many requests");
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
    const collection: Collection<Document> = database.collection("agents");

    const result: Document[] = await collection
      .find()
      .project(publicAgentSearchConfig)
      .toArray();

    cache.update(result);
    if (!hasResponded) res.status(200).json({ message: "Success", result });
  }).catch((error: Error) => {
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
    const collection: Collection<Document> = database.collection("agents");

    const { photo } = req.body;
    if (!photo) {
      return res
        .status(400)
        .json({ message: "Missing required fields", result: null });
    }

    // Upload the photo to the google cloud storage
    const data: any = await generateInsertionData(req.body);
    if (data.photo !== defaultAgentHeadshotPhoto) {
      const result = await uploadAgentPhotoGCP(photo, data.name, data.user_id)
        .then((photo: string) => (data.photo = photo))
        .catch((error: Error) => error);

      if (result instanceof Error)
        return res.status(500).json({ message: res.message });
    }

    await collection.insertOne(data).then((result) => {
      if (!result.acknowledged) {
        return res
          .status(409)
          .json({ message: "Failed to add agent", result: null });
      }

      cache.add_agent(data);
      res.status(200).json({ message: "Success", result });
    });
  }).catch((error: Error) => res.status(500).json({ message: error.message }));
};

/**
 * Delete an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const deleteAgent = async (req: any, res: any): Promise<void> => {
  const { user_id } = req.body;
  if (!user_id) {
    return res
      .status(400)
      .json({ message: "Missing required fields", result: null });
  }

  await context(async (database) => {
    const collection: Collection<Document> = database.collection("agents");

    // Check if the agent already exists
    const agent: Document | null = await collection.findOne({
      user_id,
    });

    if (!agent) {
      res.status(409).json({ message: "Agent does not exist", result: null });
      return;
    }

    // Delete the agent from the database
    const result: DeleteResult = await collection.deleteOne({
      user_id,
    });

    if (result.deletedCount === 0) {
      return res
        .status(409)
        .json({ message: "Failed to delete agent", result: null });
    }

    // Delete the agent photo from the google cloud storage
    if (agent.photo !== defaultAgentHeadshotPhoto) {
      const deleteResult = await deleteAgentPhotoGCP(agent.photo, agent.user_id)
        .then(() => {})
        .catch((error: Error) => error);

      if (deleteResult instanceof Error)
        return res.status(500).json({ message: res.message });
    }

    cache.delete_agent(user_id);
    res.status(200).json({ message: "Success", result });
  }).catch((error: Error) => res.status(500).json({ message: error.message }));
};

// Check if the body of the request is valid
const isValidAgentBody = (body: any) =>
  body.name &&
  body.email &&
  body.license &&
  body.title &&
  body.lang &&
  body.priority !== undefined &&
  body.team &&
  body.region &&
  body.region.location &&
  body.region.lat !== undefined &&
  body.region.lon !== undefined &&
  body.permissions &&
  body.permissions.length > 0;

// Generate the insert data from the request body
const generateInsertionData = async (body: any) => {
  const userId: string = await generateId();
  return {
    name: body.name,
    email: body.email,
    license: body.license,
    photo: body.photo || defaultAgentHeadshotPhoto,
    title: body.title,
    lang: body.lang,
    priority: body.priority,
    team: body.team,
    region: body.region,
    permissions: body.permissions,
    user_id: userId,
    hidden: false,
  };
};
