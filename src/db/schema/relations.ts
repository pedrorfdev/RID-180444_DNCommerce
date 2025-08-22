import { relations } from "drizzle-orm";
import { customers } from "./customer.ts";
import { orders } from "./orders.ts";
import { stocks } from "./stocks.ts";
import { products } from "./products.ts";
import { sales } from "./sales.ts";
import { orderProducts } from "./order-products.ts";
import { stockItems } from "./stock-items.ts";

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

export const stockItemsRelations = relations(stockItems, ({ one }) => ({
    product: one(products, {
        fields: [stockItems.productId],
        references: [products.id],
    }),
    stock: one(stocks, {
        fields: [stockItems.stockId],
        references: [stocks.id],
    }),
}));