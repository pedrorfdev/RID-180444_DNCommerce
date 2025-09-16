import { decimal, integer, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders.ts";
import { products } from "./products.ts";

export const orderProducts = pgTable("order_products", {
    id: uuid().primaryKey().defaultRandom(),
    orderId: uuid().notNull().references(() => orders.id, { onDelete: 'cascade' }),
    productId: uuid().notNull().references(() => products.id, { onDelete: 'restrict' }),
    quantity: integer().notNull().default(1),
    price: decimal({ precision: 10, scale: 2 }).notNull()
}, (table) => {
    return {
        unqOrderProduct: unique().on(table.orderId, table.productId)
    }
})