import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import swaggerFile from './shared/infra/swagger/swagger.json';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const findAllAvailableController = new FindAllAvailableController();

const createDeliveryController = new CreateDeliveryController();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.post('/deliveryman/', createDeliverymanController.handle);
routes.post(
  '/deliveryman/authenticate/',
  authenticateDeliverymanController.handle
);

routes.post(
  '/delivery/',
  ensureAuthenticateClient,
  createDeliveryController.handle
);
routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

export { routes };
