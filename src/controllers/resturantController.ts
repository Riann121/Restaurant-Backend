
import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import dotenv from 'dotenv';
import { resturantSchema } from "../models/resturantModel.js";
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
                const Data = new resturantSchema(title, imageURL, foods, pickup, delivery, isOpen, logoURL, rating, coords)

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
export {createResturents,getAllResturants}
