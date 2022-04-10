import { Deliveries } from '@prisma/client';

interface ICreateDelivery {
  item_name: string;
  id_client: string;
}
class CreateDeliveryUseCase {
  async execute({
    id_client,
    item_name
  }: ICreateDelivery): Promise<Deliveries> {
    return this.deliveryRepository.create(delivery);
  }
}
