import { Router } from "express";
import { stockController } from "./stock-controller.ts";
import { stockProductsController } from "./stock-product-controller.ts";

export const stockRouter = Router()

stockRouter.get('/', stockController.getAll)
stockRouter.get('/:id', stockController.getById)
stockRouter.post('/', stockController.create)
stockRouter.put('/:id', stockController.update)

stockRouter.post('/stock-items/', stockProductsController.create)
stockRouter.post('/stock-items/add', stockProductsController.add)
stockRouter.post('/stock-items/remove', stockProductsController.remove)
stockRouter.get('/stock-items/total/:productId', stockProductsController.getTotalQuantity)