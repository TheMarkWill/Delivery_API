declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      PORT?: string;
      DATABASE_URL: string;
      TOKEN_CLIENT_JWT: string;
      TOKEN_DELIVERYMAN_JWT: string;
    }
  }
}

export {};
