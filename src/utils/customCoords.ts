import { Column } from "typeorm";

export class coords {
    @Column("varchar")
    id! : string;
    @Column("varchar")
    latitude!:string;
    @Column("varchar")
    latitudeDelta!:string;
    @Column("varchar")
    longtitude!:string;
    @Column("varchar")
    longtitudeDelta!:string;
    @Column("varchar")
    address!:string;
    @Column("varchar")
    title!:string;
}


        // id
        // latitude
        // latitudeDelta
        // longtitude
        // longtitudeDelta
        // address
        // title
