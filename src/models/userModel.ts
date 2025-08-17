import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import "reflect-metadata"
import { orderschema } from "./oderModel.js";

enum Role{
    ADMIN = "admin",
    CLIENT = "client",
    VENDOR = "vendor",
    DRIVER = "driver"
}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!:number;
    
    @Column("varchar")
    userName!:string;
    
    @Column("varchar")
    email!:string;
    
    @Column("varchar")
    password!:string;
    
    @Column("varchar",{array:true})
    address!:string[];
    
    @Column("varchar")
    phone!:string;
    
    @Column({
        type:'enum',
        enum: Role,
        default: Role.CLIENT
    })
    role!:Role;
    
    @Column("varchar",{
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMDGg7R6MmM2jaF1p9m-xg8Qw7-KxQHVlQQ&s"
    })
    profile!:string;
    
    @Column({type:"varchar", nullable: true})
    answer!:string;

    @OneToOne(() => orderschema, order => order.userDetails)
    order!:orderschema;

    //CONSTRUCTOR
    constructor(userName:string, email:string, password:string, address:string[], phone:string, role:Role, answer:String){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.role = role;
    }
}

