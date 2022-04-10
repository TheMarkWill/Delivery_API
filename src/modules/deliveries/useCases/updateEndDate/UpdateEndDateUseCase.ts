import { Deliveries } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';

interface IUpdateDelivery {
  id_delivery: string;
  id_deliveryman: string;
}

class UpdateEndDateUseCase {
  async execute({
    id_delivery,
    id_deliveryman
  }: IUpdateDelivery): Promise<Deliveries> {
    const delivery = await prisma.deliveries.findFirst({
      where: { id: id_delivery, id_deliveryman }
    });

    if (!delivery) {
      throw new Error('Delivery not found');
    }

    Object.assign(delivery, {
      end_at: new Date()
    });

    await prisma.deliveries.updateMany({
      where: { id: id_delivery, id_deliveryman },
      data: delivery
    });

    return delivery;
  }
}

export { UpdateEndDateUseCase };
