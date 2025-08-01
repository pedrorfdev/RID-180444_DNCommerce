import { decimal, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.js";

export const stocks = pgTable("stocks", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid().unique().references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer().notNull().default(0),
    createdAt: timestamp().defaultNow()
})