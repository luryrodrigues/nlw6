import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin, password}: IUserRequest){ 
        const usersRepository = getCustomRepository(UsersRepository);

        if (!email) {
            throw new Error("Email required")
        }

        const userAlreadyExists = await usersRepository.findOne({email});

        if (userAlreadyExists) {
            throw new Error ("User already exists");
        }

        const user = await usersRepository.create({name, email, admin, password});

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }

