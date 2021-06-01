import { v4 as uuid } from 'uuid'
import { IPaymentMethod } from '../interfaces/IPaymentMethod'
import Client from './Client'
import Product from './Product'

class OrderSales {
    readonly id: string
    date: Date
    price: number
    product: Product[]
    client: Client
    _paymentMethod: IPaymentMethod

    constructor(paymentMethod: IPaymentMethod) {
        if (!this.id) {
            this.id = uuid()
        }
        this._paymentMethod = paymentMethod
    }


}

export default OrderSales