import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import nodemailer from "nodemailer";
import { context } from "@/app/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";

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
  } catch (_err: any) {
    return res.status(429).send(`Too many requests`);
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
  // await rateLimit(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email_to, name, email, phone, message } = req.body;
  if (!email_to || !email || !message || !name || !phone) {
    return res.status(400).json({ message: "Missing fields from body" });
  }

  // Verify that the email_to is a valid agent email
  await verifyEmail(email_to).then(
    async () => await sendEmail(res, email_to, name, email, phone, message),
  );
}

/**
 * Function to verify that the email_to is a valid agent email
 * @param email The email to verify
 * @returns Promise
 * @throws Error
 */
const verifyEmail = async (email: string): Promise<void> => {
  await context(async (database) => {
    const collection = database.collection("agents");
    await collection
      .findOne({
        email: email,
      })
      .then((result) => {
        if (!result) throw new Error("Email not found");
      });
  });
};

/**
 * Function to send the email using nodemailer
 */
const sendEmail = async (
  res: any,
  emailTo: string,
  name: string,
  email: string,
  phone: string,
  message: string,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  const data = {
    from: "Simpson Associates Contact Submission",
    to: emailTo,
    subject: `Simpson Associates Contact Submission`,
    text: `Submission Information:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n${message}`,
    html: `<h3>Submission Information:</h3><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Phone:</strong> ${phone}<br/><strong>Message:</strong><br/>${message}`,
  };

  transporter.sendMail(data, (err: any, msg: any) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: msg });
  });
};
