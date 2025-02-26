import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

interface User {
  name: string;
  email: string;
  password: string;
}

const SECRET = process.env.JWT_SECRET || "defaultSecretKey";

if (!SECRET) {
  throw new Error("JWT_SECRET não está configurado no ambiente");
}

let users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "Usuário já cadastrado" });
    }

    const newUser: User = { name, email, password };
    users.push(newUser);

    const token = createToken(newUser);

    return res
      .status(201)
      .json({ token, message: "Cadastro realizado com sucesso!" });
  } catch (err: any) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

function createToken(user: User): string {
  return jwt.sign({ email: user.email, name: user.name }, SECRET, {
    expiresIn: "1h",
  });
}

export function readToken(token: string): User | null {
  try {
    return jwt.verify(token, SECRET) as User;
  } catch (err) {
    throw new Error("Token inválido");
  }
}

export function verifica(token: string) {
  return readToken(token);
}
export function cadastro(body: User): string {
  const user = users.find(({ email }) => email === body.email);
  if (user) throw new Error("Usuário já cadastrado");

  users.push(body);
  return createToken(body);
}

export function login(body: { email: string; password: string }): string {
  const user = users.find(({ email }) => email === body.email);
  if (!user) throw new Error("Usuário não cadastrado");
  if (user.password !== body.password) throw new Error("Senha incorreta");

  return createToken(user);
}
