import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import dotenv from 'dotenv';
import { resturantSchema } from "../models/restaurantModel.js";
import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { ObjectLiteral } from 'typeorm';
import { foodSchema } from '../models/foodModel.js';
dotenv.config()

//REGISTER RESTURANTS
const createResturents = async(req:Request,res:Response) => {
    try {
        const verify = req.body.auth.role
        const authInfo = req.body.phone 
        if(verify === 'owner'){    
            const { title, imageURL, isOpen, logoURL, rating} = req.body
        
            if(!title || !imageURL || !logoURL || !rating){
                res.status(404).json({
                success:false,
                message:"Please Insert Every Field."
                })
                throw new Error('Insert Error')
            }
            else{
                const resturantRepo = AppDataSource.getRepository(resturantSchema)
                const isDublicate = await resturantRepo.findOne({where:{title:title, imageURL:imageURL, logoURL:logoURL}})

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
                    const userRepo = AppDataSource.getRepository(User)
                    const userData = await userRepo.findOne({where:{phone:authInfo}})
                    if(userData){
                        const Data = new resturantSchema(title, userData, imageURL, isOpen, logoURL, rating)
                        //DB initialization
                        await resturantRepo.insert(Data)
                        res.status(200).json({
                            success:true,
                            message:"Registered Successfully.",
                            Data
                        })
                    }
                }
            }   
        }
        else {
            throw new Error("You don't have Owner Account")
        }
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Cannot Create Resturant Order"
        })
    }
}

//GET ALL RESTURANTS FOR USER
const getAllResturantsForUser = async(req:Request,res:Response) => {
    try {
        const verify = req.body.auth.role
        if(verify === 'client'){
            const resturantRepo = AppDataSource.getRepository(resturantSchema) 
            const allData = await resturantRepo.find({relations:['foods']})
            const forUser:ObjectLiteral = allData.map(({orders, ...safeUser})=>safeUser)
                    res.status(200).json({
                        success:true,
                        message:"Resturant List",
                        forUser,
                    })
        }
        else if(verify === 'rider'){
            const resturantRepo = AppDataSource.getRepository(resturantSchema) 
            const allData = await resturantRepo.find({relations:['orders']})
            const forUser:ObjectLiteral = allData.map(({foods,logoURL,rating,imageURL, ...safeUser})=>safeUser)
                    res.status(200).json({
                        success:true,
                        message:"Resturant List",
                        forUser,
                    })
        }
        else if(verify === 'owner'){
            const user = req.body.auth.phone
            const userRepo = AppDataSource.getRepository(User)
            //const userData = await 
            const resturantRepo = AppDataSource.getRepository(resturantSchema) 
            const allData = await resturantRepo.findOne({where:{},relations:['orders','foods']})
                res.status(200).json({
                    success:true,
                    message:"Resturant List",
                    allData,
                })
        }
        else{
            throw new Error('Error to show for any Role')
        }
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error to show"
        })
    }
}

//GET RESTAURANT FOR RIDER
const getAllResturantsForRider = async(req:Request, res:Response)=>{
    try {
        const verify = req.body.auth.role
        if(verify === 'rider'){
            const resturantRepo = AppDataSource.getRepository(resturantSchema) 
            const allData = await resturantRepo.find()
            const forUser:ObjectLiteral = allData.map(({foods,logoURL,rating,imageURL, ...safeUser})=>safeUser)
                    res.status(200).json({
                    success:true,
                    message:"Resturant List",
                    forUser,
                    })
        }
        else {
            throw new Error('You are not a Rider')
        }
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
            const authValue = (decoded!.payload) as JwtPayload;
            const userData = await userRepo.findOne({where:{phone:authValue.phone}});
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
                await repo.delete({restaurantId:id})
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
            message: `Foods of Restaurant: ${title.title}`,
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

export {createResturents, getAllResturantsForUser, deleteRestaurant, getFoodbyRestaurant}
