import { ECategory } from "../enums/ECategory";
import { v4 as uuid } from "uuid";

class Product {
    readonly id: string;
    name: string;
    description: string
    price: number
    category: ECategory

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    createNew(product: Product) {
        
    }

    update(product: Product) {

    }

    disable(product: Product) {

    }

}

export default Product