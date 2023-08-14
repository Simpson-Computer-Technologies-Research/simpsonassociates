import { context } from "@/app/lib/mongo";

import { AgentsCache } from "@/app/lib/cache";
const cache = new AgentsCache();

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
  permissions: 1,
};

// Function to verify that the user making the request is an admin
const verifyAdmin = async (req: any, res: any) => {
  // Get the users access token from the headers
  const token = req.headers.authorization;

  // If the token is not present, return a 401
  if (!token) return false;

  // Get the database and collection
  await context(async (database) => {
    const collection = database.collection("agents");

    // Get the user from the database
    const user = await collection
      .find({ authorization: token })
      .project({ permissions: 1 })
      .limit(1)
      .toArray();

    // If the user doesn't exist, return a 401
    if (!user) return false;

    // Return whether the user is an admin
    return user[0].permissions.includes("admin");
  });
};

// Get the agents from the database and return them as JSON
export default async function handler(req: any, res: any) {
  // Getting agents
  if (req.method === "GET") {
    await getAgents(req, res);
    return;
  } else {
    // Verify that the user is an admin
    const isAdmin = await verifyAdmin(req, res);
    if (!isAdmin) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Updating an agent
    if (req.method === "POST") {
      await postAgent(req, res);
      return;
    }
    // Adding an agent
    else if (req.method === "PUT") {
      await putAgent(req, res);
      return;
    }
    // Deleting an agent
    else if (req.method === "DELETE") {
      await deleteAgent(req, res);
      return;
    }
    // Invalid method
    else {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }
  }

  // Invalid method
}

// Get the agents from the database and return them as JSON
const getAgents = async (req: any, res: any) => {
  let hasResponded: boolean = false;
  if (cache.isCached()) {
    res.status(200).json({ message: "Success", result: cache.get() });
    hasResponded = true;
  }

  await context(async (database) => {
    // Get the database and collection
    const collection = database.collection("agents");

    // Get the agents from the database
    const result = await collection.find().project(searchConfig).toArray();
    if (!result) return;

    // Update the cache
    cache.update(result);
    if (!hasResponded) {
      res.status(200).json({ message: "Success", result });
    }
  });
};

// Update an agent
const postAgent = async (req: any, res: any) => {
  // Get the database and collection
  await context(async (database) => {
    const collection = database.collection("agents");

    // Get the agent from the database
    const result = await collection.findOne({ email: req.body.email });
    if (!result) {
      res.status(404).json({ message: "Not found", update: null });
      return;
    }

    // Get the agent from the database
    const update = await collection.findOneAndUpdate(
      { email: req.body.email },
      { $set: req.body },
      { upsert: true },
    );

    // If the agent doesn't exist, return a 404
    if (!update) {
      res.status(404).json({ message: "Not found", update: null });
      return;
    }

    // Return the agent as JSON
    res.status(200).json({ message: "Success", update });
  });
};

// Add an agent
const putAgent = async (req: any, res: any) => {
  if (!isValidPutAgentBody(req.body)) {
    return res
      .status(400)
      .json({ message: "Missing required fields", result: null });
  }
  await context(async (database) => {
    const collection = database.collection("agents");

    // Check if the agent already exists
    const agent = await collection.findOne({ email: req.body.email });
    if (agent) {
      res.status(409).json({ message: "Agent already exists", result: null });
      return;
    }

    // Add the agent to the database
    const result = await collection.insertOne({
      ...req.body,
      authorization: "",
    });

    // Return the agent as JSON
    res.status(200).json({ message: "Success", result });
  });
};

// Delete an agent
const deleteAgent = async (req: any, res: any) => {
  const { email } = req.body;
  await context(async (database) => {
    const collection = database.collection("agents");

    // Check if the agent already exists
    const agent = await collection.findOne({ email });
    if (!agent) {
      res.status(409).json({ message: "Agent does not exist", result: null });
      return;
    }

    // Delete the agent from the database
    const result = await collection.deleteOne({ email });

    // Return the agent as JSON
    res.status(200).json({ message: "Success", result });
  });
};

// Check if the body of the request is valid
const isValidPutAgentBody = (body: any) => {
  const { name, email, license, region, title, photo, lang, level } = body;
  return name && email && license && region && title && photo && lang && level;
};
