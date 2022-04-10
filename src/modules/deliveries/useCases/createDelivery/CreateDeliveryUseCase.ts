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
        id_deliveryman: '52ddf316-e443-411c-9aa1-3ad5a9369714'
      }
    });

    return delivery;
  }
}

export { CreateDeliveryUseCase };
