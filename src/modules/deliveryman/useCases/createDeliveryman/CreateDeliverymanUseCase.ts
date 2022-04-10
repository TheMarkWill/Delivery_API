import { hash } from 'bcrypt';

import { Deliveryman } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

class CreateDeliverymanUseCase {
  async execute({
    username,
    password
  }: ICreateDeliveryman): Promise<Deliveryman> {
    const DeliverymanAlreadyExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username
        }
      }
    });

    if (DeliverymanAlreadyExist) {
      throw new Error('Deliveryman already exist');
    }

    const hashedPassword = await hash(password, 10);

    return prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword
      }
    });
  }
}

export { CreateDeliverymanUseCase };
