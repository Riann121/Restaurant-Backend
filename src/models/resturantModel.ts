import { coords } from './../utils/customCoords.js';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import "reflect-metadata"


@Entity()
export class resturantSchema{
    @PrimaryGeneratedColumn()
    id!:number;
    @Column("varchar")
    title!:string;
    @Column("varchar",{
        default:"" //default image URL put here
    })
    imageURL!:string;
    @Column("varchar",{array:true})
    foods!:string[];
    @Column("varchar",{default:true})
    pickup!:boolean;
    @Column("varchar", {default:true})
    delivery!:boolean;
    @Column("varchar",{default:true})
    isOpen!:boolean;    
    @Column("varchar")
    logoURL!:string;
    @Column("varchar")
    rating!:number;
    @Column("varchar")
    coords!:coords;

    //CONSTRUCTOR
    constructor (title:string, imageURL:string, foods:string[], pickup:boolean, delivery:boolean, isOpen:boolean, logoURL:string, rating:number,coords:coords){
      this.title = title,
      this.imageURL = imageURL,
      this.foods = foods,
      this.pickup = pickup,
      this.delivery = delivery,
      this.isOpen = isOpen,
      this.logoURL = logoURL,
      this.rating = rating,
      this.coords = coords
    }
}
//title, imageURL, foods, pickup, delivery, isOpen, logoURL, rating, coords
