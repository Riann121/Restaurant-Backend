import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { getUserController } from "../controllers/GetUserContoller.js";

const userRouter = Router();

userRouter.get('/getUser',authMiddleware,getUserController)

export {userRouter}