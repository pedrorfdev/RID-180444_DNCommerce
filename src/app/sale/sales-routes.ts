import { Router } from "express";
import { salesController } from "./sales-controllers.ts";

export const salesRouter = Router()

salesRouter.get('/', salesController.getAll)
salesRouter.get('/:id', salesController.getById)
salesRouter.post('/', salesController.create)