import { decodeAuthorization } from "@/lib/auth";
import { GLOBAL } from "@/lib/mongo";
import { applyMiddleware, getMiddlewares } from "@/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, Db, Document, UpdateResult } from "mongodb";

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
  // If the requestg method is not a PUT
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method not allowed" });
  }

  if (await rateLimit(req, res)) {
    return res.status(429).send("Too many requests");
  }

  // Get the authorization token from the request header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = await decodeAuthorization(authorization);
  if (!decoded || !decoded.email || !decoded.accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await GLOBAL.database
    .context(async (database: Db) => {
      const collection: Collection<Document> = database.collection("agents");
      const user = await collection.findOne({
        access_token: decoded.accessToken,
      });

      if (user && user.access_token) {
        return res
          .status(400)
          .json({ message: "Authorization token already set" });
      }

      const result: UpdateResult<Document> = await collection.updateOne(
        { email: decoded.email },
        { $set: { access_token: decoded.accessToken } },
        { upsert: true },
      );

      if (result.modifiedCount !== 1) {
        return res
          .status(400)
          .json({ message: "Failed to update authorization token" });
      }

      res.status(200).json({ message: "Authorization token set", result });
    })
    .catch((err: Error) => res.status(500).json({ message: err.message }));
}
