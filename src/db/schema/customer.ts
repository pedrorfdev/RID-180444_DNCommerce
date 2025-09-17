import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { sales } from "./sales.ts";

export const customers = pgTable("customers", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    sale_id: uuid().notNull().references(() => sales.id, {onDelete: 'restrict'})
})