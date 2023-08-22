import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { User } from "@/lib/types";
import { decodeAuthorization } from "@/lib/auth";

export class Database {
  /**
   * Globalize the database
   * @returns void
   * @static @readonly @async
   */
  public static readonly globalize = async (): Promise<void> => {
    const global: any = globalThis as any;
    if (!global.database) {
      global.database = new Database();
    }
  };

  /**
   * Shortcut to run a function in the context of the database
   * @param fn the function to execute
   * @returns the result of the function
   * @readonly @async @static
   */
  public static readonly context = async (
    fn: (db: Db) => Promise<any>,
  ): Promise<any> => {
    const global: any = globalThis as any;
    return await global.database.context(fn);
  };

  /**
   * The database uri and client
   * @private @readonly
   */
  private readonly uri: string = process.env.MONGODB_URI || "";
  private readonly client: MongoClient;

  constructor() {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
      },
      minPoolSize: 2,
      maxIdleTimeMS: 10000,
      maxStalenessSeconds: 10000,
      connectTimeoutMS: 10000,
    });

    this.client
      .connect()
      .catch((_: Error) => {
        console.error("Database connection failed");
        this.client.close();
      })
      .then(() => {
        console.log("Database connected");
      });
  }

  /**
   * Run a function in the context of the database
   * @param fn the function to execute
   * @returns the result of the function
   * @public @async @readonly
   * @throws Error
   */
  public readonly context = async (
    fn: (db: Db) => Promise<any>,
  ): Promise<any> => {
    const db: Db = this.client.db("simpsonassociates");
    return await fn(db);
  };
}

// Globalize the database
Database.globalize();

/*
export async function context(fn: (db: Db) => Promise<any>): Promise<any> {
  const client: MongoClient = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
    },
    maxConnecting: 1,
    maxIdleTimeMS: 10000,
    maxStalenessSeconds: 10000,
    connectTimeoutMS: 10000,
  });

  // Connect to the database, run the function, and then close the connection
  // If an error occurs, reject the promise
  return await client
    .connect()
    .then(async () => {
      const db: Db = client.db("simpsonassociates");
      return await fn(db).finally(() => client.close());
    })
    .catch((err: Error) => {
      client.close().then(() => {
        throw err;
      });
    });
}*/

// Search configs
export const publicAgentSearchConfig = {
  name: 1,
  email: 1,
  license: 1,
  region: 1,
  title: 1,
  photo: 1,
  lang: 1,
  user_id: 1,
  permissions: 1,
  hidden: 1,
  priority: 1,
  team: 1,
};

export const publicTeamSearchConfig = {
  name: 1,
  email: 1,
  title: 1,
  photo: 1,
  team: 1,
};

/**
 * Verify that the user making the request is authenticated to do so
 * @param authorization The authorization header
 * @returns True if the user is authenticated, false otherwise
 */
export const verifyAuth = async (
  collection: any,
  authorization: string,
): Promise<any | false> => {
  if (!authorization) return false;

  const decoded = await decodeAuthorization(authorization);
  if (!decoded || !decoded.email || !decoded.accessToken) return false;

  const users: User[] = await collection
    .find({ access_token: decoded.accessToken })
    .project({ email: 1 })
    .limit(1)
    .toArray();

  if (users.length === 0 || !users[0]) return false;

  return {
    result: users[0].email === decoded.email,
    email: decoded.email,
    access_token: decoded.accessToken,
  };
};

/**
 * Verify that the user making the request has the provided permissions
 * @param authorization The authorization header
 * @returns boolean
 */
export const verifyPermissions = async (
  authorization: string,
  permissions: string[],
): Promise<boolean> =>
  await Database.context(async (database: Db) => {
    const collection = database.collection("agents");

    const authenticated = await verifyAuth(collection, authorization);
    if (!authenticated.result) return false;

    const user = await collection
      .find({ access_token: authenticated.access_token })
      .project({ permissions: 1 })
      .limit(1)
      .toArray();

    // If the user doesn't exist
    if (user.length === 0 || !user[0]) return false;

    for (const permission of permissions) {
      if (!user[0].permissions.includes(permission)) {
        return false;
      }
    }
    return true;
  }).catch((_: Error) => false);

/**
 * Verify that the user making the request is an admin
 * @param authorization The authorization header
 * @returns True if the user is an admin, false otherwise
 */
export const verifyAdmin = async (authorization: string): Promise<boolean> =>
  await verifyPermissions(authorization, ["admin"]);

/**
 * Verify that the user making the request has the manage events permission
 * @param authorization The authorization header
 * @returns boolean
 */
export const verifyManageEvents = async (
  authorization: string,
): Promise<boolean> =>
  await verifyPermissions(authorization, ["manage_events"]);

/**
 * Verify that the user making the request has the agent permission
 * @param authorization The authorization header
 * @returns boolean
 */
export const verifyIsAgent = async (authorization: string): Promise<boolean> =>
  await verifyPermissions(authorization, ["agent"]);
