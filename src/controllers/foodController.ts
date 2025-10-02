import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import dotenv from 'dotenv';
import { foodSchema } from '../models/foodModel.js';
import { resturantSchema } from '../models/restaurantModel.js';
dotenv.config()

//CREATE FOOD
const createFood = async(req:Request,res:Response) => {
    try {
        //foodName, description, isAvailable, restaurant, quantity, timeToMake, rating
        const {foodName, description, isAvailable, quantity, timeToMake, rating} = req.body
        if(!foodName || !description || !rating || !quantity || !timeToMake){   
            throw new Error("insert all the section")
        }
        else{
            const foodRepo = AppDataSource.getRepository(foodSchema)
            const isDublicate = await foodRepo.findOne({where:{foodName:foodName, description: description, timeToMake: timeToMake}})
            
            if(isDublicate){
                res.status(500).json({
                success:false,
                message:"this food is already available"
            })
                throw Error("this food is already available")
            }
            else{
                const find:string = req.params.restaurantId
                const restaurantRepo = AppDataSource.getRepository(resturantSchema)
                const restaurantId = await restaurantRepo.findOne({where:{restaurantId : find}})
                console.log(JSON.stringify(restaurantId,null,2))
                if(restaurantId){
                    const data = new foodSchema(foodName, description, isAvailable, restaurantId, quantity, timeToMake, rating )
                    const foodData = await foodRepo.insert(data)

                    if (foodData) {
                    res.status(200).json({
                    success:true,
                    message:"Created Successfully.",
                    data
                })
                }
            }}
        }
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Cannot Create Food"
        })
    }
}

//GET ALL FOODS
const getAllFoods = async(req:Request,res:Response) => {
    try {
        const foodRepo = AppDataSource.getRepository(foodSchema) 
        const allData = await foodRepo.find();
                res.status(200).json({
                success:true,
                message:"Food List",
                allData
                })
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error to show"
        })
    }
}

//GET RESTAURANT BY FOOD
// const getRestaurantbyFood = async(req:Request, res:Response) =>{
//     try {
//         const foodName = req.body.foodName;
//         const foodRepo = AppDataSource.getRepository(foodSchema)
//         const data = await foodRepo.find({where:{foodName:foodName}, relations : ["restaurant"]})
//         res.status(200).json({
//                 success:true,
//                 message:"Restaurant List",
//                 data
//                 })

//     } catch (error) {
//         console.log(`Error : ${error}`.bgRed);
//         res.status(500).json({
//             success:false,
//             message:"Error to show"
//         })
//     }
// }


export { getAllFoods, createFood};