import express,{Router} from 'express';
import { authControler, loginController } from '../controllers/loginController.js';

const authRouter:Router = Router();

//register 
authRouter.post('/register',authControler);

//login
authRouter.post('/login',loginController);


export {authRouter};
