import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid().primaryKey().defaultRandom(),
    productName: text().notNull(),
    productDescription: text(),
    productPrice: decimal({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp().defaultNow()
})