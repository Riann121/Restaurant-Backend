import { Request, Response } from "express"

const testControler = (req:Request,res:Response)=>{
    try {
        res.send("Hi from Rian again");
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

export {testControler};