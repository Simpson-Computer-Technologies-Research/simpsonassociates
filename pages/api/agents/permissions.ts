import { decodeAuthorization } from "@/app/lib/auth";
import { context } from "@/app/lib/mongo";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, Document } from "mongodb";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed", permissions: [] });
  }

  if (await rateLimit(req, res)) {
    return res.status(429).send("Too many requests");
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized", permissions: [] });
  }

  const decoded = await decodeAuthorization(authorization);
  if (!decoded || !decoded.email || !decoded.accessToken) {
    return res.status(401).json({ message: "Unauthorized", permissions: [] });
  }

  await context(async (database) => {
    const collection: Collection<Document> = database.collection("agents");
    const result: Document[] = await collection
      .find({
        access_token: decoded.accessToken,
      })
      .project({ permissions: 1 })
      .limit(1)
      .toArray();

    const agent: any = result[0];
    if (!agent) {
      return res.status(401).json({ message: "Unauthorized", permissions: [] });
    }

    res.status(200).json({ message: "ok", permissions: agent.permissions });
  }).catch((error: Error) => res.status(500).json({ message: error.message }));
}
