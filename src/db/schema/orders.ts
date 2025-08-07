import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { customers } from "./customer.ts";

export const orders = pgTable("orders", {
    id: uuid().primaryKey().defaultRandom(),
    customerId: uuid().references(() => customers.id, { onDelete: 'restrict' }).notNull(),
    orderDate: timestamp().defaultNow(),
})