import { Router } from 'express'
import { signUp, singIn } from '../controllers/user.controller'

export const authRouter = Router()

authRouter.post('/signup', signUp)
authRouter.post('/signin', singIn)
