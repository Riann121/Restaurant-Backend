import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne, ManyToOne } from "typeorm";
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

    @PrimaryGeneratedColumn('uuid')
    orderId!:string;

    //FOOD DETAIL RELATION
    @OneToMany(() => foodSchema, foods => foods.order)
    foodDetails!:foodSchema[];


    //CLIENT DETAIL RELATION
    @ManyToOne(() => User, user => user.userId)
    userDetails!:User;

    //RIDER DETAIL RELATION
    @OneToOne(() => User)
    riderId!:User;

    //RESTAURANT DETAIL RELATION
    @ManyToOne(() => resturantSchema, restaurant => restaurant.orders,{nullable:true})  
    restaurantDetails!:resturantSchema;
    
    @Column('varchar')
    payment!: "Done"|"CashOnDelivery";
    
    @Column('varchar')
    deliveryTime!: string;

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