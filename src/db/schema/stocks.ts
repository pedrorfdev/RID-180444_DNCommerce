import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.ts";

export const stocks = pgTable("stocks", {
    id: uuid().primaryKey().defaultRandom(),
    stockName: text().notNull(),
    stockDescription: text(),
    createdAt: timestamp().defaultNow()
})