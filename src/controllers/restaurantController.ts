import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import dotenv from 'dotenv';
import { resturantSchema } from "../models/restaurantModel.js";
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
dotenv.config()

//REGISTER RESTURANTS
const createResturents = async(req:Request,res:Response) => {
    try {
        const { title, 
                imageURL,
                foods, 
                pickup, 
                delivery, 
                isOpen,
                logoURL,
                rating,
                coords, } = req.body
            
                console.log(title ?? false);

        if(!title || !imageURL || !foods || !logoURL || !rating || !coords){
            res.status(404).json({
            success:false,
            message:"Please Insert Every Field."
            })
            throw new Error('Insert Error')
        }
        else{
            const resturantRepo = AppDataSource.getRepository(resturantSchema)
            const isDublicate = await resturantRepo.findOne({where:{title:title,coords:coords}})

            //check if Resturant is resgistered
            if(isDublicate){
                res.status(404).json({
                success:false,
                message:"This Resturant is already resgistered"
                })
            throw new Error('Resgister Error')
            }
            else{
                //real object data for database
                const Data = new resturantSchema(title, imageURL, pickup, delivery, isOpen, logoURL, rating, coords)

                //DB initialization
                await resturantRepo.insert(Data)
                res.status(200).json({
                success:true,
                message:"Registered Successfully.",
                Data
                })
            }
        }
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Cannot Create Resturant Order"
        })
    }
}

//GET ALL RESTURANTS
const getAllResturants = async(req:Request,res:Response) => {
    try {
        const resturantRepo = AppDataSource.getRepository(resturantSchema) 
        const allData = await resturantRepo.find()
                res.status(200).json({
                success:true,
                message:"Resturant List",
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

//DELETE RESTURANTS
const deleteRestaurant = async (req:Request , res:Response) => {
    try {
        const {userPassword, id } = req.body
        const token = req.headers['authorization']?.split(" ")[1];
        const userRepo = AppDataSource.getRepository(User)
        if(!token){
            res.status(404).json({
                success:false,
                message:"Please login first"
                })
            throw new Error('JWT token Error')
        }
        else{
            const decoded = jwt.decode(token,{complete:true})
            const mail= (decoded!.payload) as JwtPayload;
            const userData = await userRepo.findOne({where:{email:mail.email}})
            const password = userData!.password

            //verify the password
            const authResult = await bcrypt.compare(userPassword,password)
            if(!authResult){
                res.status(404).json({
                success:false,
                message:"Password is invaild"
                })
                throw new Error('hash password Error')
            }
            else{
                const repo = AppDataSource.getRepository(resturantSchema)
                await repo.delete({id:id})
                res.status(200).json({
                success:true,
                message:"DELETE successful",
                })
            }
        }
  
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error to delete"
        })
    }
}

//GET FOOD BY RESTAURANT

const getFoodbyRestaurant = async (req: Request, res: Response) => {
    try {
        const title  = req.body;
        console.log(title)
        const restaurantRepo = AppDataSource.getRepository(resturantSchema);

        const data = await restaurantRepo.find({
            where: {title: title.title,},relations: ["foods"],
        });

        res.status(200).json({
            success: true,
            message: `Foods for restaurant: ${title.title}`,
            data,
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({
            success: false,
            message: "Error fetching restaurant foods",
        });
    }
};

export {createResturents, getAllResturants, deleteRestaurant, getFoodbyRestaurant}
