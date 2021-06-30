import { CreateTagService } from "../services/CreateTagService";
import { Response, Request } from "express";

class CreateTagController {
    async handle(req: Request, res: Response){
        const { name } = req.body;

        const createTagService = new CreateTagService();

        const tag = await createTagService.execute(name);

        return res.json(tag);
    }
}

export { CreateTagController };