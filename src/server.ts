import dotenv from "dotenv";
import morgan from "morgan";
import express,{Request,Response,Express} from "express";
import router from "./routes/testRoutes.js";
dotenv.config({path:".env"});

const app:Express = express();
const PORT= process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//request from controller
app.use("/api/v1/testGet",router);


//requestsS
app.get("/",(req:Request,res:Response)=>{
  res.send({
    "author":"Rian",
    "message":"Hello from Rian"
  })
})

app.listen(PORT,()=>{
    console.log(`Server is running in the port ${PORT}`);
})

