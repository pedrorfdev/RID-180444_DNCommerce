import type { Request, Response } from 'express'
import { productService } from "./product-service.ts"

const productController = {
    async create(request: Request, response: Response) {
        try {
            const { name, description, price, stockId, quantity } = request.body

            if (!stockId || quantity === undefined) {
                return response.status(400).json({ error: "stockId and quantity are required." });
            }

            const newProduct = await productService.create({ name, description, price, stockId, quantity })
            return response.status(201).json(newProduct)
        } catch (error) {
            return response.status(500).json({ error: "Failed to create product." })
        }
    },

    async getAll(request: Request, response: Response) {
        try {
            const products = await productService.getAll()
            return response.status(200).json(products)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to retrieve products.' })
        }
    },

    async getById(request: Request, response: Response) {
        try {
            const { id } = request.params

            const product = await productService.getById(id)

            if (!product) {
                return response.status(404).json({ error: 'There is no product with that id' })
            }

            return response.json(product)
        } catch (error) {
            return response.status(500).json({ error: 'Failed to retrieve product.' })
        }
    },

    async update(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { name, description, price } = request.body

            const updatedProduct = await productService.update({
                id,
                name,
                description,
                price
            })

            return response.json(updatedProduct)
        } catch (error) {
            return response.status(500).json({ error: 'The product cannot be updated' })
        }
    },

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params
            await productService.delete(id)
            return response.status(204).json([])
        } catch (error) {
            return response.status(500).json({ error: 'An error has ocurred.' })
        }
    }
}

export default productController