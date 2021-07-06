import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    // verificar se o user é admin
    const { user_id } = req;
    console.log(user_id);

    const usersRepository = getCustomRepository(UsersRepository);

    const { admin } = await usersRepository.findOne(user_id);

    if (admin) {
        return next();
    }

    return res.status(401).json({
        error: 'Unauthorized'
    })
}