import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleWare.js";
import { createResturents, getAllResturants } from "../controllers/resturantController.js";

const routerRes = Router()

routerRes.get('/register',authMiddleware,createResturents)

routerRes.get('/getAll',authMiddleware,getAllResturants)
export {routerRes}