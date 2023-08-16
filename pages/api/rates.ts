import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { RatesCache } from "@/app/lib/cache";

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
  } catch (_err: any) {
    return res.status(429).send(`Too many requests`);
  }
};

export default async function handler(req: any, res: any) {
  await rateLimit(req, res);

  let hasResponded: boolean = false;
  if (cache.isCached()) {
    res.status(200).json(cache.get());
    hasResponded = true;
  }

  const apiKey = process.env.DOMINION_RATES_API_KEY;
  const url: string =
    "https://secure.dominionintranet.ca/rest/rates?apikey=" + apiKey;
  await fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      if (!json.Rates) throw new Error("No rates found");

      cache.set(json.Rates);
      if (!hasResponded) res.status(200).json(json.Rates);
    })
    .catch((err) => {
      if (!hasResponded) res.status(500).json({ error: err.message });
    });
}
