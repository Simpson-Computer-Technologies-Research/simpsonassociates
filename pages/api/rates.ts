import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { RatesCache } from "@/app/lib/cache";
import { NextApiRequest, NextApiResponse } from "next";
import { Rate } from "@/app/lib/types";

// Create a new cache instance
const cache = new RatesCache();

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
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (await rateLimit(req, res)) {
    return res.status(429).send(`Too many requests`);
  }

  if (cache.isCached()) {
    res.status(200).json(cache.get());
    return fetchRates();
  }

  await fetchRates()
    .then((rates: Rate[]) => res.status(200).json(rates))
    .catch((err: Error) => res.status(500).json({ message: err.message }));
}

const fetchRates = async () => {
  const apiKey: string = process.env.DOMINION_RATES_API_KEY || "'";
  const url: string =
    "https://secure.dominionintranet.ca/rest/rates?apikey=" + apiKey;
  return await fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      if (!json.Rates) throw new Error("No rates found");
      cache.set(json.Rates);
      return json.Rates;
    });
};
