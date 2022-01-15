import { hash } from 'bcrypt';
import {prisma} from "../../../../database/prismaClient";

interface ICreateClient {
    username: string;
    password: string;
}

class CreateClientUseCase {
    async execute({ username, password }: ICreateClient){
        const clientAlreadyExist = await prisma.clients.findFirst({
            where: {
                username: {
                    mode: "insensitive",
                    equals: username
                }
            }
        });

        if(clientAlreadyExist){
            throw new Error("Client already exist");
        }

        const hashedPassword = await hash(password, 10);

        return prisma.clients.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
    }
}

export { CreateClientUseCase };
