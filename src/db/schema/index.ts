import { customers } from "./customer.ts";
import { orderProducts } from "./order-products.ts";
import { orders } from "./orders.ts";
import { products } from "./products.ts";
import { sales } from "./sales.ts";
import { stockItems } from "./stock-items.ts";
import { stocks } from "./stocks.ts";

export const schema = {
    customers,
    orders,
    products,
    stocks,
    sales,
    stockItems,
    orderProducts
}