import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { IPaymentMethod } from '../interfaces/IPaymentMethod'
import Client from './Client'
import Product from './Product'

@Entity()
class OrderSales {

    @PrimaryColumn()
    readonly id: string

    @Column()
    date: Date

    @Column()
    price: number

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[]

    @ManyToOne(() => Client, client => client.orderSales)
    client: Client

    _paymentMethod: IPaymentMethod

    constructor(paymentMethod: IPaymentMethod) {
        if (!this.id) {
            this.id = uuid()
        }
        this._paymentMethod = paymentMethod
    }

    makePurchase(client: Client, product: Product) {

    }
}

export default OrderSales