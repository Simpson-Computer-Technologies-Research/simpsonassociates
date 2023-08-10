import { MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "<connection string>";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Connect to the MongoDB cluster and return the client
 * @param fn Function to execute with client passed as argument
 * @returns error
 */
async function context(
  fn: (client: MongoClient) => Promise<any>
): Promise<any> {
  try {
    await client.connect();
    return await fn(client);
  } catch (e) {
    return e;
  } finally {
    await client.close();
  }
}

export { client, context };
