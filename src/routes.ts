import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/account/useCases/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/findAllDeliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import swaggerFile from './shared/infra/swagger/swagger.json';

const routes = Router();

const createClientController = new CreateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

const findAllAvailableController = new FindAllAvailableController();
const createDeliveryController = new CreateDeliveryController();
const updateDeliverymanController = new UpdateDeliverymanController();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.get(
  '/client/deliveries/',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);

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

routes.put(
  '/delivery/:id_delivery/updateDeliveryman/',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

export { routes };
