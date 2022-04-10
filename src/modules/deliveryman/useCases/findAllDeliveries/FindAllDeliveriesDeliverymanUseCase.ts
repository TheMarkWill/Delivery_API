import { Deliveries } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string): Promise<
    {
      username: string;
      deliveries: Deliveries[];
    }[]
  > {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_deliveryman
      },
      select: {
        id: true,
        username: true,
        deliveries: true
      }
    });

    return deliveries;
  }
}

export { FindAllDeliveriesDeliverymanUseCase };
