import type { Request, Response } from 'express';
import { orderService } from './order-services.ts';

export const orderController = {
    async create(req: Request, res: Response) {
        try {
            const { customerId, products } = req.body;

            if (!customerId || !products || !Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ error: "Invalid payload: customerId and a list of products are required." });
            }

            const newOrder = await orderService.create({ customerId, products });
            return res.status(201).json(newOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create order.' });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const orders = await orderService.getAll();
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve orders.' });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await orderService.getById(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found.' });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve order.' });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedOrder = await orderService.update({ orderId: id });
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found.' });
            }
            return res.status(200).json(updatedOrder);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update order.' });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await orderService.delete(id);
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error });
        }
    },
};