import { relations } from "drizzle-orm";
import { customers } from "./customer.js";
import { orders } from "./orders.js";
import { stocks } from "./stocks.js";
import { products } from "./products.js";
import { sales } from "./sales.js";
import { orderProducts } from "./orderProducts.js";

export const customerRelations = relations(customers, ({ many }) => ({
    orders: many(orders)
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
    customer: one(customers, {
        fields: [orders.customerId],
        references: [customers.id]
    }),
    sale: one(sales, {
        fields: [orders.id],
        references: [sales.orderId]
    }),
    orderProducts: many(orderProducts)
}))

export const productsRelations = relations(products, ({ one, many }) => ({
    stock: one(stocks, {
        fields: [products.id],
        references: [stocks.productId],
    }),
    orderProducts: many(orderProducts)
}));

export const stocksRelations = relations(stocks, ({ one }) => ({
    product: one(products, {
        fields: [stocks.productId],
        references: [products.id],
    }),
}));

export const salesRelations = relations(sales, ({ one }) => ({
    order: one(orders, {
        fields: [sales.orderId],
        references: [orders.id]
    })
}))

export const orderProductsRelations = relations(orderProducts, ({ one }) => ({
    order: one(orders, {
        fields: [orderProducts.orderId],
        references: [orders.id]
    }),
    product: one(products, {
        fields: [orderProducts.productId],
        references: [products.id],
    }),
}))