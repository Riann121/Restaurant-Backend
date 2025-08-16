import colors from "colors";
colors.enable();
import 'reflect-metadata';
import dotenv from "dotenv";
import morgan from "morgan";
import express,{Request,Response,Express} from "express";
import router from "./routes/testRoutes.js";
import { authRouter } from './routes/authRoutes.js';
import { AppDataSource } from './config/DB.js';
import { userRouter } from "./routes/userRoutes.js";
import { routerRes } from "./routes/restaurantRoutes.js";
import { routerFood } from "./routes/foodRoutes.js";
dotenv.config({path:".env"});

const app:Express = express();
const PORT= process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//--------------USER-----------------

//request from controller
app.use("/api/v1/testGet",router);
//for Login and Registration
app.use("/api/v1/auth",authRouter);
//for user to see
app.use("/api/v1/user",userRouter);

//--------------RESTURANTS-----------------

app.use('/api/v1/resturants',routerRes);

//--------------FOODS-----------------

app.use('/api/v1/food',routerFood)

//requests
app.get("/",(req:Request,res:Response)=>{
  res.send({
    "author":"Rian",
    "message":"Hello from Rian"
  })
})

//DataBase initialization
AppDataSource.initialize()
.then(async()=>{
  console.log("Data-Base connected...".bgCyan);
  app.listen(PORT,()=>{
  console.log(`Server is running in the port ${PORT}`.bgBlue);

})
}
)



