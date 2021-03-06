import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prismaClient';

interface IAuthenticate {
  username: string;
  password: string;
}

class AuthenticateDeliverymanUseCase {
  async execute({
    username,
    password
  }: IAuthenticate): Promise<{ token: string }> {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username }
    });
    if (!deliveryman) {
      throw new Error('Username or password invalid!');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, process.env.TOKEN_DELIVERYMAN_JWT, {
      subject: deliveryman.id,
      expiresIn: '1d'
    });

    return { token };
  }
}

export { AuthenticateDeliverymanUseCase };
