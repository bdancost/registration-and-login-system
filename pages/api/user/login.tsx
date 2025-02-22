import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../../services/user";

interface ErrorResponse {
  error: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  try {
    const user = login(req.body);
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: "Erro desconhecido" });
    }
  }
}
