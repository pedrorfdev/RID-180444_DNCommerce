import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    description: text(),
    price: decimal({ precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp().defaultNow()
})