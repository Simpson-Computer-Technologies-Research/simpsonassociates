import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      uploadPhoto(req, res);
    }
    case "DELETE": {
      deletePhoto(req, res);
    }
    default: {
      res.status(405).json({ message: "Request method not allowed" });
    }
  }
}

const uploadPhoto = (req: NextApiRequest, res: NextApiResponse) => {};
const deletePhoto = (req: NextApiRequest, res: NextApiResponse) => {};
