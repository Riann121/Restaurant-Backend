import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config()


const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port: Number(process.env.SERVER_PORT) || 5432,
    username:"postgres",
    password:"test123",
    database:"DB",
    entities:["./src/models/*{.ts,.js}"],
    synchronize:true,
    logging:false,
})

AppDataSource.initialize()
export {AppDataSource};