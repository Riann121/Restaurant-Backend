import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createOrder } from "../controllers/orderController.js";

const orderRouter = Router()

orderRouter.post('/orderCreate',authMiddleware,createOrder)

export {orderRouter}