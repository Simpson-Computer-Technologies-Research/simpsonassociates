import { context } from "@/app/lib/mongo";
import { AgentsCache } from "@/app/lib/cache";
import { decodeAuthorization, generateUserId } from "@/app/lib/auth";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";

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
    return res.status(429).send(`Too many requests`);
  }
};

// Create a new agents cache
const cache = new AgentsCache();

// Search config
const searchConfig = {
  name: 1,
  email: 1,
  license: 1,
  region: 1,
  title: 1,
  photo: 1,
  lang: 1,
  level: 1,
  user_id: 1,
};

/**
 * Verify that the user making the request is authenticated to do so
 * @param authorization The authorization header
 * @returns True if the user is authenticated, false otherwise
 */
const verifyAuth = async (
  collection: any,
  authorization: string,
): Promise<any | false> => {
  if (!authorization) return false;

  const decoded = await decodeAuthorization(authorization);
  if (!decoded || !decoded.email || !decoded.accessToken) return false;

  return await collection
    .find({ access_token: decoded.accessToken })
    .project({ email: 1 })
    .limit(1)
    .toArray()
    .then((user: any) => {
      if (user.length === 0 || !user[0]) return false;

      return {
        result: user[0].email === decoded.email,
        email: decoded.email,
        access_token: decoded.accessToken,
      };
    })
    .catch((_: any) => false);
};

/**
 * Verify that the user making the request is an admin
 * @param authorization The authorization header
 * @returns True if the user is an admin, false otherwise
 */
const verifyAdmin = async (authorization: string): Promise<boolean> => {
  // Get the database and collection
  return await context(async (database): Promise<boolean> => {
    const collection = database.collection("agents");

    const authenticated = await verifyAuth(collection, authorization);
    if (!authenticated.result) return false;

    const user = await collection
      .find({ access_token: authenticated.access_token })
      .project({ permissions: 1 })
      .limit(1)
      .toArray();

    // If the user doesn't exist
    if (user.length === 0 || !user[0]) return false;

    // Return whether the user is an admin
    return user[0].permissions.includes("admin");
  }).catch((_) => false);
};

export default async function handler(req: any, res: any) {
  await rateLimit(req, res);
  // Getting agents
  if (req.method === "GET") {
    await getAgents(req, res);
    return;
  }

  const { authorization } = req.headers;

  const isAdmin = await verifyAdmin(authorization);
  if (!isAdmin) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  switch (req.method) {
    case "POST":
      await postAgent(req, res);
      return;
    case "PUT":
      await putAgent(req, res);
      return;
    case "DELETE":
      await deleteAgent(req, res);
      return;
    default:
      res.status(405).json({ message: "Method not allowed" });
      return;
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
      .project(searchConfig)
      .toArray()
      .then((result) => {
        cache.update(result);
        if (!hasResponded) {
          res.status(200).json({ message: "Success", result });
        }
      });
  }).catch((error) => {
    if (!hasResponded) {
      res.status(500).json({ message: error.message });
    }
  });
};

/**
 * Update an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const postAgent = async (req: any, res: any): Promise<void> =>
  await context(async (database) => {
    const collection = database.collection("agents");
    const { agent_id } = req.body;

    await collection.findOne({ user_id: agent_id }).then(async (result) => {
      if (!result) {
        res.status(404).json({ message: "Not found", update: null });
        return;
      }

      await collection
        .findOneAndUpdate(
          { user_id: agent_id },
          { $set: req.body.data },
          { upsert: true },
        )
        .then((update) => {
          if (!update) {
            res.status(404).json({ message: "Not found", update: null });
            return;
          }

          cache.update_agent(agent_id, req.body.data);
          res.status(200).json({ message: "Success", update });
        });
    });
  }).catch((error) => res.status(500).json({ message: error.message }));

/**
 * Add an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const putAgent = async (req: any, res: any) => {
  if (!isValidPutAgentBody(req.body)) {
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
      })
      .then((result) => {
        if (!result.acknowledged) {
          res
            .status(409)
            .json({ message: "Failed to add agent", result: null });
          return;
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
          res
            .status(409)
            .json({ message: "Failed to delete agent", result: null });
          return;
        }

        cache.delete_agent(agent_id);
        res.status(200).json({ message: "Success", result });
      });
    });
  }).catch((error) => res.status(500).json({ message: error.message }));
};

// Check if the body of the request is valid
const isValidPutAgentBody = (body: any) =>
  body.name &&
  body.email &&
  body.license &&
  body.region &&
  body.title &&
  body.photo &&
  body.lang &&
  body.level &&
  body.permissions.length > 0;
