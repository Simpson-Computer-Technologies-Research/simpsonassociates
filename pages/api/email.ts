import { applyMiddleware, getMiddlewares } from "@/app/lib/rate-limit";
import nodemailer from "nodemailer";

/**
 * Middlewares to limit the number of requests
 */
const middlewares = getMiddlewares({ limit: 2, delayMs: 0 }).map(applyMiddleware);

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
export default async function handler(req: any, res: any) {
  await rateLimit(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;
  if (!email || !message || !name || !phone) {
    return res.status(400).json({ message: "Missing fields from body" });
  }

  // Send the email. Response is sent in the function
  await sendEmail(res, name, email, phone, message);
}

/**
 * Function to send the email using nodemailer
 */
const sendEmail = async (
  res: any,
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
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Contact form submission by ${name}`,
    text: `${message} \n\n Sent from: ${email} (${phone})`,
    html: `<div>${message}</div><p>Sent from: ${email} (${phone})</p>`,
  };

  transporter.sendMail(data, (err: any, msg: any) => {
    if (err) res.status(500).json({ message: err.message });
    else res.status(200).json({ message: msg });
  });
};
