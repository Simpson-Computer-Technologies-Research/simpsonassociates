import nodemailer from "nodemailer";

interface Data {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (
  data: Data,
  onError: (err: Error) => void,
  onSuccess: (msg: any) => void,
) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  return transporter.sendMail(data, (err: Error | null, msg: any) => {
    if (err) onError(err);
    else onSuccess(msg);
  });
};
