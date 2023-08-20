import { NextApiRequest, NextApiResponse } from "next";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { context, publicTeamSearchConfig } from "@/app/lib/mongo";
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
  return res.status(400).json({ message: "Endpoint deprecated." });

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (await rateLimit(req, res)) {
    return res.status(429).send(`Too many requests`);
  }

  const { team } = req.query;
  if (!team) {
    return res.status(400).json({ message: "Invalid team" });
  }
  const teamSplit: string[] = (team as string).split(",");

  await context(async (database) => {
    const collection = database.collection("agents");
    await collection
      .find({
        team: { $in: teamSplit },
      })
      .project(publicTeamSearchConfig)
      .toArray()
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "No agents found" });
        }

        res.status(200).json({ agents: result });
      })
      .catch((_) => res.status(500).json({ message: "Internal server error" }));
  }).catch((_) => res.status(500).json({ message: "Internal server error" }));
}
