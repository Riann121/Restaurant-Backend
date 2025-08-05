import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { getUserController, updateUserController } from "../controllers/userContoller.js";

const userRouter = Router();
//get user info
userRouter.get('/getUser',authMiddleware,getUserController)
//update user ifo
userRouter.patch('/updateUser/:id',authMiddleware,updateUserController)

export {userRouter}
