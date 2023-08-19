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
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed", permissions: [] });
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
    const collection = database.collection("agents");
    await collection
      .findOne({
        access_token: decoded.accessToken,
      })
      .then((result) => {
        if (!result) {
          res.status(401).json({ message: "Unauthorized", permissions: [] });
          return;
        }

        const permissions = result.permissions;
        res.status(200).json({ message: "OK", permissions });
      });
  }).catch((error) => res.status(500).json({ message: error.message }));
}
