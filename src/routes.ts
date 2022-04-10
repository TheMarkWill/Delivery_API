import { Router } from 'express';
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import {AuthenticateClientController} from "./modules/account/useCases/authenticateClientUseCase/AuthenticateClientController";
import { CreateDeliveryController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { AuthenticateDeliverymanController } from './modules/account/useCases/authenticateDeliverymanUseCase/AuthenticateDeliverymanController';
import swaggerFile from './shared/infra/swagger/swagger.json';

import swaggerUi from 'swagger-ui-express';
const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliveryController = new CreateDeliveryController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController();


routes.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile)
);

routes.post('/client/', createClientController.handle);
routes.post('/client/authenticate/', authenticateClientController.handle);
routes.post('/delivery/', createDeliveryController.handle);
routes.post('/delivery/authenticate/', authenticateDeliverymanController.handle);

export { routes };
