import { decimal, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.ts";

export const stocks = pgTable("stocks", {
    id: uuid().primaryKey().defaultRandom(),
    stockName: text().notNull(),
    stockQuantity: integer().notNull().default(0),
    productId: uuid().unique().references(() => products.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow()
})