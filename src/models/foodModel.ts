import { Min, Max } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { resturantSchema } from "./restaurantModel.js";
import { orderschema } from "./oderModel.js";

@Entity()
export class foodSchema {
    @PrimaryGeneratedColumn('uuid')
    foodId!: string;
    
    @Column("varchar")
    foodName!: string;
    
    @Column("varchar")
    description!: string;
    
    @Column({ type: "boolean", default: true })
    isAvailable!: boolean;
    
    @ManyToOne(() => resturantSchema, restaurant => restaurant.foods, { onDelete: "CASCADE" })
    restaurant!: resturantSchema;

    @Column()
    quantity!: number;
    
    @Column()
    timeToMake!:string;

    @Column("int")
    @Min(1)
    @Max(5)
    rating!: number;

    @ManyToOne(() => orderschema, order => order.foodDetails)
    order!:orderschema;

    constructor(foodName: string, description: string, isAvailable: boolean, restaurant: resturantSchema, quantity: number, timeToMake: string, rating: number) {
        this.foodName = foodName;
        this.description = description;
        this.isAvailable = isAvailable;
        this.restaurant = restaurant;
        this.quantity = quantity;
        this.timeToMake = timeToMake;
        this.rating = rating;
    }
}
