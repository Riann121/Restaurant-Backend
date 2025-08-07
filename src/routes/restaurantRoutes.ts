import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createResturents, deleteRestaurant, getAllResturants } from "../controllers/restaurantController.js";

const routerRes = Router()

routerRes.get('/register',authMiddleware,createResturents)

routerRes.get('/getAll',authMiddleware,getAllResturants)

routerRes.delete('/delete',authMiddleware,deleteRestaurant)


export {routerRes}