import { Min, Max } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import { resturantSchema } from "./restaurantModel.js";

@Entity()
export class foodSchema {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column("varchar")
    foodName!: string;
    
    @Column("varchar")
    description!: string;
    
    @Column({ type: "boolean", default: true })
    isAvailable!: boolean;
    
    @ManyToOne(() => resturantSchema, restaurant => restaurant.foods, { onDelete: "CASCADE" })
    @JoinColumn({ name: "restaurantId" })
    restaurant!: resturantSchema;

    @Column("int")
    @Min(1)
    @Max(5)
    rating!: number;

    @OneToMany(() => resturantSchema, restaurant => restaurant.food)
    restaurants!:resturantSchema[];

    constructor(foodName: string, description: string, isAvailable: boolean, restaurant: resturantSchema, rating: number) {
        this.foodName = foodName;
        this.description = description;
        this.isAvailable = isAvailable;
        this.restaurant = restaurant;
        this.rating = rating;
    }
}
