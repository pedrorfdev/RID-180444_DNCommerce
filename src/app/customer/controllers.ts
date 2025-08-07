import type { Request, Response } from 'express'
import { customerService } from "./services.ts"

const customerController = {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body
        const newCustomer = await customerService.create({ name, email, password })
        return response.status(201).json(newCustomer)
    },

    async getAll(request: Request, response: Response) {
        try {
            const customers = await customerService.getAll()
            return response.status(200).json(customers)
        } catch (error) {
            return response.status(400).json()
        }
    },

    async getById(request: Request, response: Response) {
        const { id } = request.params

        const customer = await customerService.getById(id)

        if (!customer) {
            throw new Error('There is no client with that id')
        }

        return customer
    },

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, email, password } = request.body

        const updatedCustomer = await customerService.update({
            id,
            name,
            email,
            password
        })

        if (!updatedCustomer) {
            throw new Error('The client cannot be updated')
        }

        return response.json(updatedCustomer)
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params

        await customerService.delete(id)

        return response.status(204).json([])
    }
}

export default customerController