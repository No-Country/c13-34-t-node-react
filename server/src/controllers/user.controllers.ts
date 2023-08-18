import { type Request, Response } from "express";

export const signUp = (_req: Request, res: Response) =>{
    res.send('singup')
}

export const singIn = (_req: Request, res: Response) => {
    res.send('singIn')
}