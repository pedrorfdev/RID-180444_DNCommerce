import { Router } from "express";
import customerController from "./controllers.js";

export const customerRouter = Router()

customerRouter.get('/', customerController.getAll)
customerRouter.get('/:id', customerController.getById)
customerRouter.post('/', customerController.create)
customerRouter.put('/:id', customerController.update)
customerRouter.delete('/:id', customerController.delete)
