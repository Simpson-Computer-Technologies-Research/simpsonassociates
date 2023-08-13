import { context } from "@/lib/mongo";

export default async function handler(req: any, res: any) {
  // Make sure the request is a post
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method not allowed", permissions: [] });
  }

  // Get the request body
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ message: "Invalid request body", permissions: [] });
  }

  // Open a database connection using a context
  await context(async (client: any) => {
    // Access the database
    const db = client.db("simpsonassociates");
    const collection = db.collection("agents");

    // If the agent is not found, return error
    const result = await collection.findOne({ email: email });
    if (!result) {
      res.status(400).json({ message: false });
    }

    // Return the agent permissions
    res.status(200).json({ permissions: result.permissions });
  });
}
