import type { Request, Response } from 'express'
import { productService } from "./services.ts"

const productController = {
    async create(request: Request, response: Response) {
        const { name, description, price } = request.body
        const newProduct = await productService.create({ name, description, price })
        return response.status(201).json(newProduct)
    },

    async getAll(request: Request, response: Response) {
        try {
            const products = await productService.getAll()
            return response.status(200).json(products)
        } catch (error) {
            return response.status(400).json()
        }
    },

    async getById(request: Request, response: Response) {
        const { id } = request.params

        const product = await productService.getById(id)

        if (!product) {
            throw new Error('There is no product with that id')
        }

        return response.json(product)
    },

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, description, price } = request.body

        const updatedProduct = await productService.update({
            id,
            name,
            description,
            price
        })

        if (!updatedProduct) {
            throw new Error('The product cannot be updated')
        }

        return response.json(updatedProduct)
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params

        await productService.delete(id)

        return response.status(204).json([])
    }
}

export default productController