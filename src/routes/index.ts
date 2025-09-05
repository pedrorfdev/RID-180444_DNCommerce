import { Router } from "express";
import { customerRouter } from "../app/customer/customer-routes.ts";
import { productRouter } from "../app/product/product-routes.ts";
import { stockRouter } from "../app/stock/stock-routes.ts";
import { orderRouter } from "../app/order/order-routes.ts";
import { salesRouter } from "../app/sale/sales-routes.ts";

const routes = Router()

routes.get('/health', (request, response) => {
    return response.json({ message: 'Hi Dev!, I am Alive' })
})

routes.use('/customers', customerRouter)
routes.use('/products', productRouter)
routes.use('/stocks', stockRouter)
routes.use('/orders', orderRouter)
routes.use('/sales', salesRouter)

export default routes