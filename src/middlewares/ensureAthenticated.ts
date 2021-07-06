import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    //receber token
    const authToken = req.headers.authorization

    //validar se token está preenchido
    if(!authToken){
        return res.status(401).end();
    }

    //validar se token é válido para

    const [,token] = authToken.split(" ");
    try {
        const { sub } = verify(token, "35c51776e619a24fac4168c505a9e179e97ce82f") as IPayload;

        req.user_id = sub;

        return next();
    } catch (err) {
        return res.status(401).end();
    }

    //recuperar infos do usuário


}