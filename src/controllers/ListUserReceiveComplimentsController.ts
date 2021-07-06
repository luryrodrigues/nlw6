import {Request, Response} from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComlimentsService";


class ListUserReceiveComplimentsController {
    async handle(req: Request, res: Response){

        const { user_id } = req;

        const listUserReceiveComplimentsService = new ListUserSendComplimentsService();

        const compliments = await listUserReceiveComplimentsService.execute(user_id);

        return res.json(compliments);
    }
}

export { ListUserReceiveComplimentsController }