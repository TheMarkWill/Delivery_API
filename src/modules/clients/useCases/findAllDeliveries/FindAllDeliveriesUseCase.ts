import { Deliveries } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

class FindAllDeliveriesUseCase {
  async execute(id_client: string): Promise<
    {
      username: string;
      deliveries: Deliveries[];
    }[]
  > {
    const deliveries = await prisma.clients.findMany({
      where: {
        id: id_client
      },
      select: {
        username: true,
        deliveries: true
      }
    });

    return deliveries;
  }
}

export { FindAllDeliveriesUseCase };
