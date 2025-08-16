import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createResturents, deleteRestaurant, getAllResturants, getFoodbyRestaurant } from "../controllers/restaurantController.js";

const routerRes = Router()

routerRes.post('/register',authMiddleware,createResturents)

routerRes.get('/getAll',authMiddleware,getAllResturants)

routerRes.get('/searchFood',authMiddleware,getFoodbyRestaurant)

routerRes.delete('/delete',authMiddleware,deleteRestaurant)


export {routerRes}