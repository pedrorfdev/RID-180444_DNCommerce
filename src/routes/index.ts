import { Router } from "express";
import { customerRouter } from "../app/customer/routes.js";

const routes = Router()

routes.get('/health', (request, response) => {
    return response.json({ message: 'Hi Dev!, I am Alive' })
})

routes.use('/customers', customerRouter)