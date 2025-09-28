import {Express, Request , Response} from 'express';
import { AppDataSource } from '../config/DB.js';
import { User } from '../models/userModel.js';
import "reflect-metadata";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({path:".env"});


//REGISTRATION AUTHENTICATION CONTROLLER FOR USER
const authControler = async(req:Request, res:Response) =>{
    try {
    const {userName, email, password, phone, Role} = req.body
    if(!userName || !email || !password || !phone || !Role){
            console.log("error in server")
            res.status(404).send({
                success:false,
                type:"error",
                message:"please insert everything"
            }) }
        //data base access
        const userRepo = AppDataSource.getRepository(User) ;
        const finding = await userRepo.findOne({where:{phone : phone}})  
        if(finding?.phone === phone){
            res.status(300).json({
                 success:false,
                 type:'error',
                 message:"You already has the email registered..please login"
            }) 
        }
        else{
        //password  hash generation
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);  

        //CONSTRACTOR INITIALIZATION
        const userData:User = new User(userName, email, hashPass, phone, Role);
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

//LOGIN CONTROLLER FOR USER
const loginController = async(req:Request , res:Response)=>{
    try {
        const {phone, password} = req.body;
        if(!phone || !password){
            res.status(404).json({
            success:false,
            message:"Invalid UserInfo..."
            })
        }
        const userRepo =  AppDataSource.getRepository(User);
        const user = await userRepo.findOne({where:{phone:phone}});

        if(!user){
            res.status(404).json({
            success:false,
            message:"User Not found..."
            })
        }
        // hash password check
        const isPassed = await bcrypt.compare(password,user!.password)
        if(isPassed){
            //create jwt
            const pass = {email:user?.email};
            const token = jwt.sign(pass,process.env.SECRET_KEY!)
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
            message:"Login failed"
        })
    }
}


export  {authControler,loginController};
