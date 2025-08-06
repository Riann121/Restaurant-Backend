import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createResturents } from "../controllers/resturantController.js";

const routerRes = Router()

routerRes.get('/register',authMiddleware,createResturents)

export {routerRes}