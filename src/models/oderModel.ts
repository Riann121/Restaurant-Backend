import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne } from "typeorm";
import "reflect-metadata";
import { User } from "./userModel.js";
import { resturantSchema } from "./restaurantModel.js";
import { foodSchema } from "./foodModel.js";

enum status{
    phase1 = "processing",
    phase2 = "on the way",
    phase3 = "delivered"
}

@Entity()
export class orderschema{

    @PrimaryGeneratedColumn()
    orderId!:number;

    //USER DETAIL RELATION
    @OneToOne(() => User, user => user.id)
    @JoinColumn({name:"userDetailId"})
    userDetails!:User;

    //RESTAURANT DETAIL RELATION
    @OneToOne(() => resturantSchema, restaurants => restaurants.order)  
    @JoinColumn({name:"restaurantId"})
    restaurantDetails!:resturantSchema;

    //FOOD DETAIL RELATION
    @OneToMany(() => foodSchema, foods => foods.order)
    foodDetails!:foodSchema[];

    @Column("varchar")
    orderStatus!:status;

    constructor(userDetails:User, restaurantDetails:resturantSchema, foodDetails:foodSchema[], orderStatus:status){
        this.userDetails = userDetails;
        this.restaurantDetails = restaurantDetails;
        this.foodDetails = foodDetails;
        this.orderStatus = orderStatus;
    }
}

export {status}