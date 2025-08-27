import { Router } from "express";
import productController from "./product-controller.ts";

export const productRouter = Router()

productRouter.get('/', productController.getAll)
productRouter.get('/:id', productController.getById)
productRouter.post('/', productController.create)
productRouter.put('/:id', productController.update)
productRouter.delete('/:id', productController.delete)
