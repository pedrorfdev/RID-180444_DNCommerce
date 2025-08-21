import { Router } from "express";
import { customerRouter } from "../app/customer/routes.ts";
import { productRouter } from "../app/product/routes.ts";

const routes = Router()

routes.get('/health', (request, response) => {
    return response.json({ message: 'Hi Dev!, I am Alive' })
})

routes.use('/customers', customerRouter)
routes.use('/products', productRouter)

export default routes