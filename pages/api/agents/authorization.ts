import { decodeAuthorization } from "@/app/lib/auth";
import { context } from "@/app/lib/mongo";

export default async function handler(req: any, res: any) {
  // If the requestg method is not a PUT
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  // Get the authorization token from the request header
  const { authorization } = req.headers;
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
