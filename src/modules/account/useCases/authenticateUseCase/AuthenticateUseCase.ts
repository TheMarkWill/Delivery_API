interface IAuthenticate {
    username: string;
    password: string;
}

class AuthenticateUseCase {
    async execute({ username, password }: IAuthenticate ){

    }
}

export { AuthenticateUseCase };
