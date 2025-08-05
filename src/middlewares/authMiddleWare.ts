
import jwt  from 'jsonwebtoken';
import { Request,Response,NextFunction } from "express"

const authMiddleware = async(req:Request,res:Response,next:NextFunction) => {
        try {
                const token = req.headers['authorization']?.split(" ")[1];
                jwt.verify(token!,process.env.SECRET_KEY!,(err,decode)=>{
                    if(err){
                        console.log(`Error : ${err}`.bgRed);
                        res.status(500).json({
                        success:false,
                        message:"Wrong Authentication"
                        })
                    }
                    else{
                        
                        const payload = decode as jwt.JwtPayload;
                        if (!req.body) req.body = {};
                        req.body.mail = payload;
                        
                        next()
                    }
                })
                
        } catch (error) {
            console.log(`Error : ${error}`.bgRed);
            res.status(500).json({
                success:false,
                message:"Authentication fail"
            })
        }
}

export {authMiddleware}