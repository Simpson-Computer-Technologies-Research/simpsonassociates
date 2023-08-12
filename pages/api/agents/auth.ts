import { context } from "@/lib/mongo";

export default async function handler(req: any, res: any) {
  // Make sure the request is a post
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the request body
  const { email, permissions } = req.body;
  if (!email || !permissions) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  // Open a database connection using a context
  /*await context(async (client: any) => {
    // Access the database
    const db = client.db("simpsonassociates");
    const collection = db.collection("agents");

    // If the agent is not found, return error
    const agent = await collection.findOne({ name: email });

    // Iterate over the permissions and check if the agent has them, if
    // they don't, return false to the response.
    for (let i = 0; i < permissions.length; i++) {
      if (!agent.permissions.includes(permissions[i])) {
        return res.status(400).json({ message: false });
      }
    }
  });*/
  return res.status(200).json({ message: true });
}
