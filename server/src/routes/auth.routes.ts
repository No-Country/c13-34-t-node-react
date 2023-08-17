import { Router } from "express";
import { signUp } from '../controllers/user.controllers';
import { singIn } from "../controllers/user.controllers.js";

const router = Router();

 router.post('/singup', signUp)
 router.post('/singin', singIn)




export default router;