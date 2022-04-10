import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, process.env.TOKEN_CLIENT_JWT) as IPayload;

    request.id_client = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token invalid' });
  }
}

export { ensureAuthenticateClient };
