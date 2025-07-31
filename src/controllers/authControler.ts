import {Express, Request , Response} from 'express';
import { AppDataSource } from '../config/DB.js';
import { User } from '../models/userModel.js';
import "reflect-metadata";
import colors from "colors";

//Registration authentication
const authControler = async(req:Request, res:Response) =>{
    try {
    const {userName, email, password, address, phone, Role} = req.body
    console.log(`${userName}, ${email}, ${password}, ${address}, ${phone}, ${Role}`)
    if(!userName || !email || !password || !address){
            console.log("error in server")
            res.status(404).send({
                success:false,
                type:"error",
                message:"please insert everything"
            }) }

        const userRepo = AppDataSource.getRepository(User) ;
        const finding = await userRepo.findOne({where:{email : email}})  
        if(finding){
            res.status(205).send({
                 success:false,
                 message:"You already has the email registered..please login"
            }) 
        }
        else{
        const userData:User = new User(userName, email, password, address, phone, Role);
        const newUser =await userRepo.insert(userData)
        if(newUser){
            console.log(`New User Created ${newUser}`);
            res.status(200).send({
                success:true,
                message:"Registration successfull"
            })
        }
    }

}
 catch (error) {
        console.log('authError: ',error);
    }
}

//loginController
const loginController = (req:Request , res:Response)=>{
    try {
        const {userName, email, password} = req.body;
        if(!userName || !email || !password){
            throw new Error("Input fields cannot be empty.")
        }
        else{
            res.status(200).json({
                success:true,
                message:"Login successful"
            })
        }

    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error in the login"
        })
    }
}


export  {authControler};
