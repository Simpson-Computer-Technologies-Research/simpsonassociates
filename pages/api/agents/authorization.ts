import { context } from "@/app/lib/mongo";

export default async function handler(req: any, res: any) {
  // If the requestg method is not a PUT
  if (req.method !== "POST") {
    res.status(400).json({ message: "Method not allowed" });
    return;
  }

  // Get the authorization token from the request header
  const { email, authorization } = req.body;

  // If the authorization token is not present
  if (!authorization || !email) {
    res.status(401).json({ message: "Invalid request body" });
    return;
  }

  // Get the user so we can check if their authorization token has already been set
  await context(async (database) => {
    const user = await database.collection("agents").findOne({ email });

    if (user && user.authorization) {
      res.status(400).json({ message: "Authorization token already set" });
      return;
    }

    // Update the user in the database
    const result = database
      .collection("agents")
      .updateOne({ email }, { $set: { authorization } }, { upsert: true });

    // If the update was successful
    res.status(200).json({ message: "Success", result });
  });
}
