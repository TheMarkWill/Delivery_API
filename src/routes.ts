import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { AuthenticateClientController } from './modules/account/useCases/authenticateClientUseCase/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliverymanUseCase/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import swaggerFile from './shared/infra/swagger/swagger.json';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliveryController = new CreateDeliveryController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.post('/deliveryman/', createDeliveryController.handle);
routes.post(
  '/deliveryman/authenticate/',
  authenticateDeliverymanController.handle
);

export { routes };
