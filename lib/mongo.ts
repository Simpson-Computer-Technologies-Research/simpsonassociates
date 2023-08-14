import { Db, MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri: string = process.env.MONGODB_URI || "";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
  },
});

// Connect to the MongoDB cluster
client.connect().then(() => {
  console.log("Connected to MongoDB cluster");
});

// Export the database connection
export const database: Db = client.db("simpsonassociates");