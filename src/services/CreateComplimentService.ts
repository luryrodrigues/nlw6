import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentsRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({tag_id, user_sender, user_receiver, message} : IComplimentsRequest){
        const complimentsRepository = getCustomRepository(ComplimentsRepository)
        const usersRepository = getCustomRepository(UsersRepository)

        const userReceiverExists = await usersRepository.findOne(user_receiver);

        //não é permitido um usuário cadastrar um elogio para si
        if(user_sender === user_receiver){
            throw new Error ('You cannot create a tag for yourself')
        }

        if (!userReceiverExists){
            throw new Error('User Receiver Not Found')
        }

        const compliment = await complimentsRepository.create({ tag_id, user_sender, user_receiver, message});

        await complimentsRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };


//não é permitido cadastrar elogios para usuários inválidos


//O usuário precisa estar autenticado na aplicação