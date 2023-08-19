import { Router } from 'express'
import { signUp, singIn } from '../controllers/user.controllers'

export const authRoutes = Router()

authRoutes.post('/singup', signUp)
authRoutes.post('/singin', singIn)
