import { coords } from '../utils/customCoords.js';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import { foodSchema } from './foodModel.js';

@Entity()
export class resturantSchema {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    title!: string;

    @Column("varchar", { default: "" })
    imageURL!: string;

    @OneToMany(() => foodSchema, food => food.restaurant)
    foods!: foodSchema[];

    @Column("boolean", { default: true })
    pickup!: boolean;

    @Column("boolean", { default: true })
    delivery!: boolean;

    @Column("boolean", { default: true })
    isOpen!: boolean;

    @Column("varchar")
    logoURL!: string;

    @Column("varchar")
    rating!: string;

    @Column(() => coords)
    coords!: coords;

    @ManyToOne(() => foodSchema, food => food.restaurant)
    @JoinColumn({name: "foodId"})
    restaurant!:foodSchema;

    constructor(title: string, imageURL: string, pickup: boolean, delivery: boolean, isOpen: boolean, logoURL: string, rating: string, coords: coords) {
        this.title = title;
        this.imageURL = imageURL;
        this.pickup = pickup;
        this.delivery = delivery;
        this.isOpen = isOpen;
        this.logoURL = logoURL;
        this.rating = rating;
        this.coords = coords;
    }
}
