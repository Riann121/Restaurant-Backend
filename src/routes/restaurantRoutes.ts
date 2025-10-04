import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createResturents, deleteRestaurant, getAllResturantsForUser, getFoodbyRestaurant } from "../controllers/restaurantController.js";

const routerRes = Router()

routerRes.post('/register',authMiddleware,createResturents)

routerRes.get('/getAllforUser',authMiddleware,getAllResturantsForUser)

routerRes.get('/searchFood',authMiddleware,getFoodbyRestaurant)

routerRes.delete('/delete',authMiddleware,deleteRestaurant)


export {routerRes}