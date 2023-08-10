import { context } from "@/lib/mongo";

// Get the agents from the database and return them as JSON
export default async function handler(_: any, res: any) {
  /*if (
    !context(async (client: any) => {
      const db = client.db("agents");
      const collection = db.collection("all");
      const agents = await collection.find().toArray();
      res.json(agents);
    })
  ) {
    res.status(500).json({ error: "Unable to connect to database" });
  }*/
  res.json([
    {
      name: "Richard Gogh",
      level: 1,
      title: "Mortgage Agent",
      license: "License #93243",
      photo: "https://via.placeholder.com/150",
      lang: "English",

      // Coordinates which will be used to calculate the distance
      // between them and the user via location, city, or postal code
      region: {
        location: "Waterloo Ontario",
        long: 0,
        lat: 0,
      },
    },
  ]);
}
