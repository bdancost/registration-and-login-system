import jwt from "jsonwebtoken";

interface User {
  name: string;
  email: string;
  password: string;
}

let users: User[] = [];

const SECRET = process.env.JWT_SECRET || "defaultSecretKey";

if (!SECRET) {
  throw new Error("JWT_SECRET não está configurado no ambiente");
}

function createToken(user: User): string {
  return jwt.sign({ email: user.email, name: user.name }, SECRET);
}

function readToken(token: string): User | null {
  try {
    return jwt.verify(token, SECRET) as User;
  } catch (err) {
    throw new Error("Token inválido");
  }
}
export function cadastro(body: User): string {
  const user = users.find(({ email }) => email === body.email);
  if (user) throw new Error("Usuário já cadastrado");

  users.push(body);

  const token = createToken(body);
  return token;
}

export function login(body: { email: string; password: string }): string {
  const user = users.find(({ email }) => email === body.email);
  if (!user) throw new Error("Usuário não cadastrado");
  if (user.password !== body.password) throw new Error("Senha incorreta");

  const token = createToken(user);
  return token;
}
