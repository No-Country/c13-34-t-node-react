import { Router } from "express";
import { signUp } from '../controllers/user.controllers.js';
import { singIn } from "../controllers/user.controllers.js";

export const authRoutes = Router();

authRoutes.post('/singup', signUp);
authRoutes.post('/singin', singIn);