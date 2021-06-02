import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import OrderSales from "./OrderSales";

@Entity()
class Client {
    
    @PrimaryColumn()
    readonly id: string
    
    @Column()
    name: string

    @Column()
    cpf: string
    
    @Column()
    birthDate: Date
    
    @OneToMany(() => OrderSales, orderSales => orderSales.client)
    orderSales: OrderSales[];

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    createNew(client: Client) {

    }

    update(client: Client) {

    }

    delete(client: Client) {

    }
}

export default Client