import { Request,Response } from "express";
import { AppDataSource } from "../config/DB.js";
import { User } from "../models/userModel.js";
import bcrypt from 'bcryptjs';

//GET USER
const getUserController = async (req:Request,res:Response)=>{
        try {
            
            const authValue = req.body.mail.email;
            const userRepo = AppDataSource.getRepository(User);
            const userData = await userRepo.findOne({where : {email : authValue}});
            //hide password and email
            const {password, email,...safeUser} = userData!;

            res.status(200).send({
                success:true,
                message:"User Data",
                userData:safeUser
            })
        console.log(`controller : ${req.body}`);
        } catch (error) {
            console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error to show"
        })
    }
}

//UPDATE USER
const updateUserController = async(req:Request,res:Response) => {
    try {
        const data = req.body;
        delete data.mail;

        //password cannot be changed
        if(!data.password || !data.email){
            const toUpdate = Number(req.params.id);
            console.log(`toUpdate : ${toUpdate}`)
            console.log(`data : ${JSON.stringify(data, null, 2)}`)
            //DB initialize
            const userRepo = AppDataSource.getRepository(User)
            await userRepo.update(toUpdate,data);
            const newData = await userRepo.findOne({where:{id:toUpdate}})
            res.status(200).send({
                    success:true,
                    message:"Data Updated Successfully",
                    newData
            })
        }
        else{
            throw new Error("Password And Email cannot be Changed.")
        }
        
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Update Error"
        })
    }
}

//RESET PASSWORD
const resetUserPassword = async(req:Request , res:Response)=>{
    try {
        const {email,answer,newPassword} = req.body;
        if(!email && !answer && !newPassword){
            
            throw new Error("Plz Insert All Field")
        }
        else{
            //DB access
            const userRepo = AppDataSource.getRepository(User)
            const authData = await userRepo.findOne({where:{email:email}})

            const result = await bcrypt.compare(answer,authData!.answer);
            if(result === true){
                const status = await userRepo.update({email:email},{password:newPassword});
                if(status){
                    res.status(200).send({
                    success:true,
                    message:"Password Reset Successfully",
            })
                }
            }
            else{
                throw new Error("Authentication Fail");
                res.status(500).json({
                success:false,
                message:"Update Error"
                })
            }
        }
    } catch (error) {
        console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Password Reset Error"
        })
    }
}

export {getUserController,updateUserController,resetUserPassword}