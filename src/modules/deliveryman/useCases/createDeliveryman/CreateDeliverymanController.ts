import { Request, Response } from 'express';

import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

class CreateDeliveryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();
    const result = await createDeliverymanUseCase.execute({
      username,
      password
    });

    return response.status(201).json(result);
  }
}

export { CreateDeliveryController };
