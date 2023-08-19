import { decodeAuthorization } from "@/app/lib/auth";
import { context } from "@/app/lib/mongo";
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
    return res.status(429).send(`Too many requests`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await rateLimit(req, res);

  // If the requestg method is not a PUT
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  // Get the authorization token from the request header
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const decoded = await decodeAuthorization(authorization);
  if (!decoded || !decoded.email || !decoded.accessToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  await context(async (database) => {
    const collection = database.collection("agents");
    const user = await collection.findOne({
      access_token: decoded.accessToken,
    });

    if (user && user.access_token) {
      res.status(400).json({ message: "Authorization token already set" });
      return;
    }

    await collection
      .updateOne(
        { email: decoded.email },
        { $set: { access_token: decoded.accessToken } },
        { upsert: true },
      )
      .then((result) => {
        if (result.modifiedCount !== 1) {
          res
            .status(400)
            .json({ message: "Failed to update authorization token" });
          return;
        }
        res.status(200).json({ message: "Authorization token set", result });
      });
  }).catch((error) => res.status(500).json({ message: error.message }));
}
