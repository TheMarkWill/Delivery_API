import {Request, Response} from "express";
import { AuthenticateUseCase } from './AuthenticateUseCase';

class AuthenticateController {
    async handle( request: Request, response: Response ){
        const { username, password } = request.body;

        const authenticateUseCase = new AuthenticateUseCase();

        const result = authenticateUseCase.execute({ username, password });

        return response.json(result);
    }
}

export { AuthenticateController }
