import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Product from '../models/Product'

export default {
    async selectAll(req: Request, res: Response) {
        const products = await new Product().selectAll()
        return res.status(200).json(products)
    },
    async create(req: Request, res: Response) {
        const { name, description, price } = req.body
        const product = new Product()
        product.name = name.toUpperCase()
        product.description = description.toUpperCase()
        product.price = price
        try {
            await product.createNew(product)
            return res.status(201).json({ message: 'Product created!' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, description, price } = req.body
        const prod = getRepository(Product).create({
            id,
            name: name.toUpperCase(),
            description: description.toUpperCase(),
            price
        })
        try {
            await new Product().update(prod)
            return res.status(200).json({ message: 'Product updated!' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            await new Product().delete(id)
            return res.status(200).json({ message: 'Product deleted!' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}