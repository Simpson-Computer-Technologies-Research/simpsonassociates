import { NextApiRequest, NextApiResponse } from "next";
import { context, verifyManageEvents, verifyIsAgent } from "@/app/lib/mongo";
import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import { generateId } from "@/app/lib/auth";
import { sendEmail } from "@/app/lib/email";
import { Event } from "@/app/lib/types";

/**
 * Constant parameters
 */
const MINS_IN_DAY: number = 1440;
const DELETE_EVENT_AFTER_MINS: number = 10 * MINS_IN_DAY;

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
 * @param req The incoming http request
 * @param res The outgoing http response
 */
const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  await context(async (database) => {
    const collection = database.collection("events");
    await collection
      .find()
      .toArray()
      .then(async (results) => {
        let finalResults: any[] = [];

        for (let i = 0; i < results.length; i++) {
          const event: any = results[i];
          const currentTime: number = new Date().getMinutes();

          if (event.date > currentTime) {
            finalResults.push(event);
            continue;
          }

          await collection.deleteOne({
            event_id: event.event_id,
          });
        }

        res.status(200).json({ message: "Success", finalResults });
      });
  }).catch((_: any) =>
    res.status(500).json({ message: "Failed to fetch events", result: null }),
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

  await context(async (database) => {
    const collection = database.collection("events");

    const data: any = await generateInsertionData(req.body);
    await collection.insertOne(data).then(() => {
      // if (notify_agents) emailAllAgents(data);
    });
  }).catch((error) => res.status(500).json({ message: error.message }));
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

  await context(async (database) => {
    const collection = database.collection("events");

    await collection.deleteOne({
      event_id,
    });
  }).catch((error) => res.status(500).json({ message: error.message }));
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
    note: body.note,
  };
};

/**
 * Notify (by email) all of the agents about the newly created event
 * @param event The event to email the agents about
 * @return void
 */
const emailAllAgents = async (event: any) => {
  await context(async (database) => {
    const collection = database.collection("agents");

    // Get all of the agent emails
    let agents = await collection
      .find()
      .project({
        email: 1,
      })
      .toArray();

    if (!agents) {
      throw new Error("Failed to fetch agents");
    }

    // Send an email to all of the agents
    for (let agent of agents) {
      const data = {
        from: "Simpson Associates Event Notification",
        to: agent.email,
        subject: `Simpson Associates Event Notification`,
        text: `Event Information:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${event.date}\nPosted by:\n${event.posted_by}\nNote:\n${event.note}`,
        html: `<h3>Event Information:</h3><strong>Title:</strong> ${event.title}<br/><strong>Description:</strong> ${event.description}<br/><strong>Date:</strong> ${event.date}<br/><strong>Posted by:</strong><br/>${event.posted_by}<br/>strong>Note:</strong><br/>${event.note}`,
      };

      await sendEmail(
        data,
        (_) => {},
        (_) => {},
      );
    }
  });
};
