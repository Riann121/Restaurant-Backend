import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import "reflect-metadata";
import { foodSchema } from './foodModel.js';
import { orderschema } from './oderModel.js';
import { User } from "./userModel.js";

@Entity()
export class resturantSchema {
    
    @PrimaryGeneratedColumn('uuid')
    restaurantId!: string;

    @Column("varchar")
    title!: string;

    @OneToOne(()=>User, user => user.userId)
    restaurantOwner!: User;

    @Column("varchar", { default: "" })
    imageURL!: string;

    @OneToMany(() => foodSchema, food => food.restaurant)
    foods!: foodSchema[];

    @Column("boolean", { default: true })
    isOpen!: boolean;

    @Column("varchar")
    logoURL!: string;

    @Column("varchar")
    rating!: string;

    @OneToMany(() => orderschema, order => order.restaurantDetails)
    orders!:orderschema[];

    constructor(title: string,owner: User, imageURL: string, isOpen: boolean, logoURL: string, rating: string) {
        this.title = title;
        this.restaurantOwner = owner
        this.imageURL = imageURL;
        this.isOpen = isOpen;
        this.logoURL = logoURL;
        this.rating = rating;

    }
}
