import { Db, MongoClient, ServerApiVersion } from "mongodb";

// Connect to the mongo database
const uri: string = process.env.MONGODB_URI || "";

export async function context(fn: (db: Db) => Promise<void>): Promise<void> {
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
    },
    maxConnecting: 10,
    maxPoolSize: 5,
    minPoolSize: 1,
    maxIdleTimeMS: 1000,
    maxStalenessSeconds: 1000,
    connectTimeoutMS: 1000,
  });
  await client.connect();

  const db: Db = client.db("simpsonassociates");
  const result: any = await fn(db);

  await client.close();
  return result;
}
