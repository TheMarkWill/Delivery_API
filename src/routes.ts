import { Router } from 'express';
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import {AuthenticateController} from "./modules/account/useCases/authenticateUseCase/AuthenticateController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateController = new AuthenticateController();

routes.post('/clients/', createClientController.handle);
routes.post('/account/authenticates/', authenticateController.handle);

export { routes };
