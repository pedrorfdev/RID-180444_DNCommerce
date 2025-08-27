import type { Request, Response } from 'express';
import { stockService } from './stock-service.ts';

export const stockProductsController = {      
    async create(req: Request, res: Response) {
        try {
            const { productId, stockId, quantity } = req.body;
            
            const newStockItem = await stockService.createStockItem({ productId, stockId, quantity });
            res.status(201).json(newStockItem);
        } catch (error) {
            res.status(400).json({ error });
        }
    },

    async add(req: Request, res: Response) {
        try {
            const { productId, stockId, quantity } = req.body;
            const updatedStockItem = await stockService.addItemToStock({ productId, stockId, quantity });
            res.status(200).json(updatedStockItem);
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const { productId, stockId, quantity } = req.body;
            const updatedStockItem = await stockService.removeItemFromStock({ productId, stockId, quantity });
            res.status(200).json(updatedStockItem);
        } catch (error) {
            res.status(404).json({ error });
        }
    },

    async getTotalQuantity(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const totalQuantity = await stockService.getProductTotalQuantity(productId);
            res.status(200).json({ productId, totalQuantity });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get total quantity.' });
        }
    }
};