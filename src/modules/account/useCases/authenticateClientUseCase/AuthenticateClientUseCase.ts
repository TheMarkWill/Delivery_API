import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticate {
    username: string;
    password: string;
}

class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticate) {
        const client = await prisma.clients.findFirst({ where: { username } });
        if (!client) {
            throw new Error('Username or password invalid!');
        }

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error('Username or password invalid!');
        }

        const token = sign({ username }, '*(&b123b12y798hz3an19n6123', {
            subject: client.id,
            expiresIn: '1d',
        });

        return { token };

    }
}

export { AuthenticateClientUseCase };
