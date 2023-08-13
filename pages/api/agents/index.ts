import { context } from "@/lib/mongo";

// Search config
const searchConfig = {
  name: 1,
  email: 1,
  license: 1,
  region: 1,
  title: 1,
  photo: 1,
  lang: 1,
  level: 1,
};

// Get the agents from the database and return them as JSON
export default async function handler(_: any, res: any) {
  if (
    !context(async (client: any) => {
      // Get the database and collection
      const db = client.db("simpsonassociates");
      const collection = db.collection("agents");

      // Get the agents from the database
      const result = await collection.find().project(searchConfig).toArray();

      // Return the agents as JSON
      res.status(200).json({ message: "Success", result });
    })
  ) {
    res
      .status(500)
      .json({ message: "Unable to connect to database", result: [] });
  }
}
