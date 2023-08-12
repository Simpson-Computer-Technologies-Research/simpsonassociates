import { context } from "@/lib/mongo";

export default async function handler(req: any, res: any) {
  // Make sure the request is a post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the request body
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  // Open a database connection
  /*await context(async (client: any) => {
    const db = client.db("simpsonassociates");
    const collection = db.collection("agents");

    // If the agent is not found, return error
    const found = await collection.findOne({ name: email });
    if (!found) {
      return res.status(404).json({ message: false });
    } else {
      return res.status(200).json({ message: true });
    }
  });*/
  return res.status(200).json({ message: true });
}
