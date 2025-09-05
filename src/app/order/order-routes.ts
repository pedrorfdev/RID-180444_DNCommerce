import { Router } from "express";
import { orderController } from "./order-controllers.ts";

export const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.get('/:id', orderController.getById);
orderRouter.post('/', orderController.create);
orderRouter.put('/:id', orderController.update);
orderRouter.delete('/:id', orderController.delete);