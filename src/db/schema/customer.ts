import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: uuid().primaryKey().defaultRandom(),
    customerName: text().notNull(),
    customerEmail: text().notNull(),
    createdAt: timestamp().defaultNow()
})