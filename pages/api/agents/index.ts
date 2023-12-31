import { Database, publicAgentSearchConfig, verifyAdmin } from "@/lib/mongo";
import { generateId } from "@/lib/auth";
import { applyMiddleware, getMiddlewares } from "@/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, Db, DeleteResult, Document } from "mongodb";
import { uploadAgentPhotoGCP, deleteAgentPhotoGCP } from "@/lib/gcp";
import { Agent } from "@/lib/types";
import { AgentsCache } from "@/lib/cache";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (await rateLimit(req, res)) {
    return res.status(429).send("Too many requests");
  }

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
  if (AgentsCache.isCached()) {
    res.status(200).json({ message: "Success", result: AgentsCache.get() });
    return fetchAgentsFromDatabase();
  }

  await fetchAgentsFromDatabase()
    .then((result: Document[]) =>
      res.status(200).json({ message: "Success", result }),
    )
    .catch((err: Error) => res.status(500).json({ message: err.message }));
};

const fetchAgentsFromDatabase = async (): Promise<Document[]> =>
  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("agents");

    const result: Document[] = await collection
      .find()
      .project(publicAgentSearchConfig)
      .toArray();

    AgentsCache.set(result as Agent[]);
    return result;
  });

/**
 * Add an agent
 * @param req The request
 * @param res The response
 * @returns void
 */
const addAgent = async (req: any, res: any) => {
  if (!isValidAgentBody(req.body)) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("agents");

    const { photo } = req.body;
    if (!photo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Upload the photo to the google cloud storage
    const data: any = await generateInsertionData(req.body);

    if (data.photo !== defaultAgentHeadshotPhoto) {
      const result = await uploadAgentPhotoGCP(photo, data.name, data.user_id)
        .then((photo: string) => (data.photo = photo))
        .catch((err: Error) => err);

      if (result instanceof Error) {
        return res.status(500).json({ message: res.message });
      }
    }

    await collection.insertOne(data).then((result) => {
      if (!result.acknowledged) {
        return res.status(409).json({ message: "Failed to add agent" });
      }

      AgentsCache.add(data);
      res.status(200).json({ message: "Success", result });
    });
  }).catch((err: Error) => res.status(500).json({ message: err.message }));
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
    return res.status(400).json({ message: "Missing required fields" });
  }

  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("agents");

    // Check if the agent already exists
    const agent: Document | null = await collection.findOne({
      user_id,
    });

    if (!agent) {
      return res.status(409).json({ message: "Agent does not exist" });
    }

    // Delete the agent from the database
    const result: DeleteResult = await collection.deleteOne({
      user_id,
    });

    if (!result.acknowledged) {
      return res.status(409).json({ message: "Failed to delete agent" });
    }

    // Delete the agent photo from the google cloud storage
    if (agent.photo !== defaultAgentHeadshotPhoto) {
      let result: any | Error = await deleteAgentPhotoGCP(
        agent.name,
        agent.user_id,
      ).catch((err: Error) => err);

      if (result instanceof Error) {
        return res.status(500).json({ message: result.message });
      }
    }

    AgentsCache.delete(user_id);
    res.status(200).json({ message: "Success", result });
  }).catch((err: Error) => res.status(500).json({ message: err.message }));
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
    notifications: true,
  };
};
