import { applyMiddleware, getMiddlewares } from "@/lib/rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@/lib/email";
import { Collection, Db, Document } from "mongodb";
import { GLOBAL } from "@/lib/mongo";

/**
 * Middlewares to limit the number of requests
 */
const middlewares = getMiddlewares({ limit: 2, delayMs: 0 }).map(
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

/**
 * Email handler
 * @param req The http request
 * @param res The http response
 * @returns void
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (await rateLimit(req, res)) {
    return res.status(429).send(`Too many requests`);
  }

  const { email_to, name, email, phone, message } = req.body;
  if (!email_to || !email || !message || !name) {
    return res.status(400).json({ message: "Missing fields from body" });
  }

  // Verify that the email_to is a valid agent email
  const isValidEmail: boolean = await verifyEmail(email_to);
  if (!isValidEmail) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const data = {
    from: "Simpson Associates Contact Submission",
    to: email_to,
    subject: `Simpson Associates Contact Submission`,
    text: `Submission Information:\nName: ${name}\nEmail: ${email}\nPhone: ${
      phone || "None Provided"
    }\nMessage:\n${message}`,
    html: `<h3>Submission Information:</h3><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Phone:</strong> ${
      phone || "None Provided"
    }<br/><strong>Message:</strong><br/>${message}`,
  };

  const onError = (err: any) => res.status(500).json({ message: err.message });

  const onSuccess = (msg: any) => res.status(200).json({ message: msg });

  await sendEmail(data, onError, onSuccess);
}

/**
 * Function to verify that the email_to is a valid agent email
 * @param email The email to verify
 * @returns Promise
 * @throws Error
 */
const verifyEmail = async (email: string): Promise<boolean> => {
  if (email === "contact@dansimpson.ca") return true;

  return await GLOBAL.database.context(async (database: Db) => {
    const collection: Collection<Document> = database.collection("agents");

    const result: Document | null = await collection.findOne({
      email: email,
    });

    return result;
  });
};
