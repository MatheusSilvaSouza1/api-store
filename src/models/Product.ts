import { Column, Entity, getRepository, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
class Product {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    description: string

    @Column()
    price: number

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    async selectAll(){
        const repository = getRepository(Product)
        const products = await repository.find()
        return products
    }

    async createNew(product: Product) {
        try {
            const repository = getRepository(Product)
            const exists = await repository.findOne({
                where: {
                    name: product.name
                }
            })
            if (exists) {
                throw new Error("This product exists")
            }
            await repository.save(product)
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(product: Product) {
        try {
            const repository = getRepository(Product)
            const exists = await repository.findOne({
                where: {
                    id: product.id
                }
            })
            if (!exists) {
                throw new Error("This product does not exist")
            }
            exists.name = product.name
            exists.description = product.description
            exists.price = product.price
            await repository.save(product)
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(id: string) {
        try {
            const repository = getRepository(Product)
            const exists = await repository.findOne({
                where: {
                    id
                }
            })
            if (!exists) {
                throw new Error("This product does not exist")
            }
            await repository.remove(exists)
        } catch (error) {
            throw new Error(error)
        }
    }

}

export default Product