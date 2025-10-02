import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createFood, getAllFoods} from "../controllers/foodController.js";


const routerFood = Router()

routerFood.post('/register/:restaurantId',authMiddleware,createFood)

routerFood.get('/getAll',authMiddleware,getAllFoods)

// routerFood.get('/searchRestaurant',authMiddleware,getRestaurantbyFood)

export {routerFood}