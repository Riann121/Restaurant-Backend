import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import "reflect-metadata"
import { orderschema } from "./oderModel.js";

enum Role{
    ADMIN = "admin",
    CLIENT = "client",
    OWNER = "owner",
    DRIVER = "rider"
}

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    userId!:string;
    
    @Column("varchar")
    userName!:string;
    
    @Column("varchar")
    email!:string;
    
    @Column("varchar")
    password!:string;
    
    @Column("varchar")
    phone!:string;
    
    @Column({
        type:'enum',
        enum: Role,
        default: Role.CLIENT
    })
    role!:Role;
    
    @OneToMany(() => orderschema, (order) => order.userDetails)
    orders!:orderschema[];

    @Column("varchar",{
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmMDGg7R6MmM2jaF1p9m-xg8Qw7-KxQHVlQQ&s"
    })
    profile!:string;

    //CONSTRUCTOR
    constructor(userName:string, email:string, password:string, phone:string, role:Role){
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }
}

