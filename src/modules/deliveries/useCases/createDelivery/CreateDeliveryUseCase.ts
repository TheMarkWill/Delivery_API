import { Deliveries } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}
class CreateDeliveryUseCase {
  async execute({
    id_client,
    item_name
  }: ICreateDelivery): Promise<Deliveries> {
    const delivery = await prisma.deliveries.create({
      data: {
        item_name,
        id_client,
        id_deliveryman: 'e39388d4-6d32-41fc-ae1f-0ca8e2b68c63'
      }
    });

    return delivery;
  }
}

export { CreateDeliveryUseCase };
