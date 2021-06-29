import { CreateUserService } from "../services/CreateUserService";
import { Response, Request } from "express";

class CreateUserController {
    async handle(req: Request, res: Response) {
        const {name, email, admin} = req.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin});

        return res.json(user);
    }
}


export { CreateUserController }