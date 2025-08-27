import type { Request, Response } from 'express';
import { stockService } from './stock-service.ts';

export const stockController = {
    async create(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            
            if (!name) {
                return res.status(400).json({ error: 'Name is required.' });
            }

            const newStock = await stockService.create({ name, description });
            res.status(201).json(newStock);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create stock.' });
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const stocks = await stockService.getAll();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve stocks.' });
        }
    },

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const stock = await stockService.getById(id);
            if (!stock) {
                return res.status(404).json({ error: 'Stock not found.' });
            }
            res.status(200).json(stock);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve stock.' });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            const updatedStock = await stockService.update({ id, name, description });
            res.status(200).json(updatedStock);
        } catch (error) {
            res.status(404).json({ error });
        }
    },
};