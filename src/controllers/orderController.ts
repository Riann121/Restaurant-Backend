import { User } from './../models/userModel.js';
import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import { foodSchema } from "../models/foodModel.js";
import { resturantSchema } from "../models/restaurantModel.js";
import { orderschema, status } from '../models/oderModel.js';

//REGISTRATION
const createOrder = async(req:Request, res:Response) => {
    try {
        const {foodName , restaurantName} = req.body
        const userNumber = req.body.auth.phone;

        const userRepo = AppDataSource.getRepository(User)
        const foodRepo = AppDataSource.getRepository(foodSchema)
        const restaurantRepo = AppDataSource.getRepository(resturantSchema)

        const findFood = await foodRepo.find({where:{foodName:foodName}})
        const findRestaurant =await restaurantRepo.findOne({where:{title:restaurantName}})
        const findUser = await userRepo.findOne({where:{phone:userNumber}})

        const data = new orderschema(findUser!,findRestaurant!,findFood!,status.phase1)
//userDetails, restaurantDetails, foodDetails, orderStatus
        const orderRepo = AppDataSource.getRepository(orderschema)
        await orderRepo.insert(data)
                res.status(200).json({
                success:true,
                message:"Created Successfully.",
                data
                })
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Cannot Create ORDER"
        })
    }
}

const userGetOrder = async(req:Request, res:Response) => {
    try {
        const orderRepo = AppDataSource.getRepository(orderschema)
        const en_auth = req.body.auth.phone;
        orderRepo.findOne({where:{}})
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Cannot Show ORDER"
        })
    }
}

export{createOrder, userGetOrder}