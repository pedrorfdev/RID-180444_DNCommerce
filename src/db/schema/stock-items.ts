import { integer, pgTable, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { products } from "./products.ts";
import { stocks } from "./stocks.ts";

export const stockItems = pgTable("stock_items", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid().notNull().references(() => products.id, { onDelete: "cascade" }),
    stockId: uuid().notNull().references(() => stocks.id, { onDelete: "cascade" }),
    quantity: integer().notNull().default(0),
}, (table) => {
    return {
        uniqueProductStock: uniqueIndex("unique_product_stock_idx").on(table.productId, table.stockId),
    };
});