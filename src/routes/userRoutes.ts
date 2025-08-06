import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { deleteUser, getUserAllController, getUserController, resetUserPassword, updateUserController } from "../controllers/userContoller.js";

const userRouter = Router();
//get user info
userRouter.get('/getUser',authMiddleware,getUserController)
//get all user info
userRouter.get('/getUserAll',authMiddleware,getUserAllController)
//update user ifo
userRouter.patch('/updateUser/:id',authMiddleware,updateUserController)
//reset password
userRouter.patch('/resetPassword/:id',authMiddleware,resetUserPassword)
//delete user
userRouter.delete('/delete',authMiddleware,deleteUser)//will be added admin control



export {userRouter}