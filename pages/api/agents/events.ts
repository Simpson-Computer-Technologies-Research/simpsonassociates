import { NextApiRequest, NextApiResponse } from "next";
import { verifyManageEvents, verifyIsAgent, Database } from "@/lib/mongo";
import { applyMiddleware, getMiddlewares } from "@/lib/rate-limit";
import { generateId } from "@/lib/auth";
import { sendEmail } from "@/lib/email";
import { Event } from "@/lib/types";
import { Collection, Db, Document } from "mongodb";
import { epochToDate } from "@/lib/date";
import { ONE_DAY_IN_MILLISECONDS } from "@/lib/constants";

/**
 * Middlewares to limit the number of requests
 */
const middlewares = getMiddlewares({ limit: 10, delayMs: 0 }).map(
  applyMiddleware,
);

/**
 * Middleware to limit the number of requests
 */
const rateLimit = async (req: any, res: any) => {
  try {
    await Promise.all(middlewares.map((mw: any) => mw(req, res)));
  } catch (_: any) {
    return true;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "GET": {
      const isAgent: boolean = await verifyIsAgent(authorization);
      if (!isAgent) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      return await getEvents(req, res);
    }
    default: {
      if (await rateLimit(req, res)) {
        return res.status(429).send("Too many requests");
      }

      const canManageEvents: boolean = await verifyManageEvents(authorization);
      if (!canManageEvents) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      switch (req.method) {
        case "POST":
          return await createEvent(req, res);
        case "DELETE":
          return await deleteEvent(req, res);
      }
    }
  }
}

/**
 * Get all of the events for agents.
 * @param _ The incoming http request
 * @param res The outgoing http response
 */
const getEvents = async (_: NextApiRequest, res: NextApiResponse) => {
  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("events");

    const results: Document[] = await collection.find({}).toArray();

    let finalResults: Document[] = [];

    for (let i = 0; i < results.length; i++) {
      const event: any = results[i];
      const currentTime: number = new Date().getTime();

      if (event.date + ONE_DAY_IN_MILLISECONDS > currentTime) {
        finalResults.push(event);
        continue;
      }

      await collection.deleteOne({
        event_id: event.event_id,
      });
    }

    res.status(200).json({ message: "Success", result: finalResults });
  }).catch((_: any) =>
    res.status(500).json({ message: "Failed to fetch events" }),
  );
};

/**
 * Create a new event and add it to the database
 * @param req The incoming http request
 * @param res The outgoing http response
 * @returns void
 */
const createEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!isValidEventBody(req.body)) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const { notify_agents } = req.body;

  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("events");

    const data: any = await generateInsertionData(req.body);
    const result = await collection.insertOne(data);
    if (notify_agents) await emailAllAgents(data);

    res.status(200).json({ message: "Success", result });
  }).catch((err: Error) => res.status(500).json({ message: err.message }));
};

/**
 * Delete an event from the database
 * @param req The incoming http request
 * @param res The outgoing http response
 * @returns void
 */
const deleteEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { event_id } = req.body;
  if (!event_id) {
    return res.status(400).json({ message: "Invalid request body" });
  }

  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("events");

    await collection.deleteOne({
      event_id,
    });

    res.status(200).json({ message: "Success" });
  }).catch((err: Error) => res.status(500).json({ message: err.message }));
};

// Check if the body of the request is valid
const isValidEventBody = (body: any) =>
  body.title &&
  body.description &&
  body.date !== undefined &&
  body.posted_by &&
  body.notify_agents !== undefined &&
  body.note !== undefined;

/**
 *
 * @param body The incomign request body
 * @returns The proper data map
 */
const generateInsertionData = async (body: any): Promise<Event> => {
  const eventId: string = await generateId();
  return {
    event_id: eventId,
    title: body.title,
    description: body.description,
    date: body.date,
    posted_by: body.posted_by,
    note: body.note || "None",
  };
};

/**
 * Notify (by email) all of the agents about the newly created event
 * @param event The event to email the agents about
 * @return void
 */
const emailAllAgents = async (event: any) => {
  await Database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("agents");

    // Get all of the agent emails
    const agents = await collection
      .find()
      .project({
        notifications: 1,
        email: 1,
      })
      .toArray();

    if (!agents) {
      throw new Error("Failed to fetch agents");
    }

    // Send an email to all of the agents
    for (const agent of agents) {
      if (!agent.notifications) return;

      const date: string = epochToDate(event.date);
      const data = {
        from: "Simpson Associates Event Notification",
        to: agent.email,
        subject: `Simpson Associates Event Notification`,
        text: `Event Information:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${date}\nPosted by: ${event.posted_by}\nNote:\n${event.note}`,
        html: `<h3>Event Information:</h3><strong>Title:</strong> ${event.title}<br/><strong>Description:</strong> ${event.description}<br/><strong>Date:</strong> ${date}<br/><strong>Posted by:</strong> ${event.posted_by}<br/><strong>Note:</strong><br/>${event.note}`,
      };

      await sendEmail(
        data,
        (_) => {},
        (_) => {},
      );
    }
  });
};
