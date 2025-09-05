import type { Request, Response } from 'express';
import { salesService } from './sales-services.ts';

export const salesController = {
    async create(req: Request, res: Response) {
        try {
            const { orderId } = req.body;
            if (!orderId) {
                return res.status(400).json({ error: "orderId is required to create a sale." });
            }
            const newSale = await salesService.create({ orderId });
            return res.status(201).json(newSale);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create sale.' });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const sales = await salesService.getAll();
            return res.status(200).json(sales);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve sales.' });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const sale = await salesService.getById(id);
            if (!sale) {
                return res.status(404).json({ error: 'Sale not found.' });
            }
            return res.status(200).json(sale);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve sale.' });
        }
    },
};