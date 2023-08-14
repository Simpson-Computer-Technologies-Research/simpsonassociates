import { Db, MongoClient, ServerApiVersion } from "mongodb";

// The URI of the database to connect to
const uri: string = process.env.MONGODB_URI || "";

/**
 * Run a function in the context of the database
 * @param fn The function to run in the context of the database
 * @returns The result of the function
 */
export async function context(fn: (db: Db) => Promise<void>): Promise<void> {
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
    },
    maxConnecting: 10,
    maxPoolSize: 5,
    minPoolSize: 1,
    maxIdleTimeMS: 10000,
    maxStalenessSeconds: 10000,
    connectTimeoutMS: 10000,
  });
  await client.connect();

  const db: Db = client.db("simpsonassociates");
  const result: any = await fn(db);

  await client.close();
  return result;
}
