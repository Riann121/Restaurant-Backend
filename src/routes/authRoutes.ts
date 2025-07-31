import express,{Router} from 'express';
import { authControler } from '../controllers/authControler.js';

const authRouter:Router = Router();

//register 
authRouter.post('/register',authControler);

//login
authRouter.post('/login',)
export {authRouter};
