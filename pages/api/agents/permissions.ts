import { decodeAuthorization } from "@/app/lib/auth";
import { context } from "@/app/lib/mongo";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed", permissions: [] });
  }

  const { authorization } = req.headers;

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
  });
}
