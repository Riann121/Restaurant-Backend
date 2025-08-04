import { Request,Response } from "express"
const getUserController = async (req:Request,res:Response)=>{
        try {
            res.status(200).send({
                success:true,
                message:"User Data"
            })
        } catch (error) {
            console.log(`Error : ${error}`.bgRed);
        res.status(500).json({
            success:false,
            message:"Error to show"
        })
    }
}


export {getUserController}