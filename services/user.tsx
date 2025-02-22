interface User {
  name: string;
  email: string;
  password: string;
}

let users: User[] = [];

export function cadastro(body: User): User {
  const user = users.find(({ email }) => email === body.email);
  if (user) throw new Error("Usuário já cadastrado");

  users.push(body);
  return body;
}

export function login(body: { email: string; password: string }): User {
  const user = users.find(({ email }) => email === body.email);
  if (!user) throw new Error("Usuário não cadastrado");
  if (user.password !== body.password) throw new Error("Senha incorreta");

  return user;
}
