import { applyMiddleware, getMiddlewares } from "./rate-limit";
import nodemailer from "nodemailer";

/**
 * Function to send the email using nodemailer
 */
const sendEmail = async (
  res: any,
  name: string,
  email: string,
  phone: string,
  message: string
): Promise<void> => {
  // Prepare nodemailer transporter
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

  // Send email
  transporter.sendMail(data, (err: any, msg: any) => {
    if (err) res.status(500).json({ message: err.message });
    else res.status(200).json({ message: msg });
  });
};

/**
 * Middlewares to limit the number of requests
 */
const middlewares = getMiddlewares({ limit: 2 }).map(applyMiddleware);

/**
 * Middleware to limit the number of requests
 */
const middleware = async (req: any, res: any) => {
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
  // Middleware rate limit
  await middleware(req, res);

  // If the method is POST, send the email
  if (req.method === "POST") {
    const { name, email, phone, message } = req.body;
    if (!email || !message) {
      return res
        .status(400)
        .json({ message: "Email and message are required" });
    }

    // Send the email. Response is sent in the function
    await sendEmail(res, name, email, phone, message);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
