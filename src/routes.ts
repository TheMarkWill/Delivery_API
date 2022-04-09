import { Router } from 'express';
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import {AuthenticateClientController} from "./modules/account/useCases/authenticateClientUseCase/AuthenticateClientController";
import { CreateDeliveryController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliveryController = new CreateDeliveryController()

routes.post('/authenticate/', authenticateClientController.handle);

routes.post('/clients/', createClientController.handle);
routes.post('/delivery/', createDeliveryController.handle);

export { routes };
