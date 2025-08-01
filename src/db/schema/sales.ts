import { decimal, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders.js";

export const sales = pgTable("sales", {
    id: uuid().primaryKey().defaultRandom(),
    orderId: uuid().references(() => orders.id).unique().notNull(),
    saleDate: timestamp().defaultNow(),
    saleValue: decimal({ precision: 10, scale: 2 }).notNull()
})