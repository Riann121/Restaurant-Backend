import {Express, Request , Response} from 'express';
import { AppDataSource } from '../config/DB.js';
import { User } from '../models/userModel.js';
import "reflect-metadata";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:".env"});


//Registration authentication
const authControler = async(req:Request, res:Response) =>{
    try {
    const {userName, email, password, address, phone, Role} = req.body
    if(!userName || !email || !password || !address){
            console.log("error in server")
            res.status(404).send({
                success:false,
                type:"error",
                message:"please insert everything"
            }) }

        const userRepo = AppDataSource.getRepository(User) ;
        const finding = await userRepo.findOne({where:{email : email}})  
        console.log("findings : ",finding?.email)
        if(finding?.email === email){
            res.status(300).json({
                 success:false,
                 message:"You already has the email registered..please login"
            }) 
        }
        else{
//password  hash generation
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);    

        const userData:User = new User(userName, email, hashPass, address, phone, Role);
        const newUser =await userRepo.insert(userData)
        if(newUser){
            console.log(`New User Created ${newUser}`);
            res.status(200).send({
                success:true,
                message:"Registration successfull",
                newUser
            })
        }
    }

}
 catch (error) {
        console.log('authError: ',error);
    }
}

//loginController
const loginController = async(req:Request , res:Response)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(404).json({
            success:false,
            message:"Invalid UserName"
            })
        }
        const userRepo =  AppDataSource.getRepository(User);
        const user = await userRepo.findOne({where:{email:email}});

        if(!user){
            res.status(404).json({
            success:false,
            message:"Invalid UserName"
            })
        }
        // hash password check
        const isPassed = await bcrypt.compare(password,user!.password)
        if(isPassed){
            //create jwt
            const token = jwt.sign({id:req.body._id},process.env.SECRET_KEY!)
            res.status(200).json({
                success:true,
                message:"Login successful",
                token,
                user:user,
                
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


export  {authControler,loginController};
