import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prismaClient';

interface IAuthenticate {
  username: string;
  password: string;
}

class AuthenticateClientUseCase {
  async execute({
    username,
    password
  }: IAuthenticate): Promise<{ token: string }> {
    const client = await prisma.clients.findFirst({ where: { username } });
    if (!client) {
      throw new Error('Username or password invalid!');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, process.env.TOKEN_CLIENT_JWT, {
      subject: client.id,
      expiresIn: '1d'
    });

    return { token };
  }
}

export { AuthenticateClientUseCase };
