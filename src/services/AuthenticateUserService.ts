import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepository } from "../repositories/UsersRepository";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {

        const usersRepository = getCustomRepository(UsersRepository);

        //Verificar se email existe
        const user = await usersRepository.findOne({ email });

        if (!user) {
            throw new Error('Email/Password incorrect');
        }

        //verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect');
        }

        //gerar token
        const token = sign(
            {
                email: user.email
            },
            "35c51776e619a24fac4168c505a9e179e97ce82f",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }