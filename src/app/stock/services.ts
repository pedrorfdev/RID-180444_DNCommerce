import { eq, sql } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

interface CreateStockPayload {
    name: string;
    description?: string;
}

interface UpdateStockPayload {
    id: string;
    name?: string;
    description?: string;
}

interface CreateStockItemPayload {
    productId: string;
    stockId: string;
    quantity: number;
}

interface AdjustStockPayload {
    productId: string;
    stockId: string;
    quantity: number;
}

export const stockService = {
    async create({name, description}: CreateStockPayload) {
        const [newStock] = await db
            .insert(schema.stocks)
            .values({stockName: name, stockDescription: description})
            .returning()

        return {
            id: newStock.id,
            name: newStock.stockName,
            description: newStock.stockDescription
        }
    },

    async getAll() {
        const result = await db.select().from(schema.stocks)
        return result
    },

    async getById(stockId: string) {
        const stock = await db
            .select()
            .from(schema.stocks)
            .where(eq(schema.stocks.id, stockId))

        return stock
    },

    async update({ id, name, description }: UpdateStockPayload) {
        const updateData: { name?: string; description?: string } = {};
        
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;

        const [updatedStock] = await db
            .update(schema.stocks)
            .set({ stockName: name, stockDescription: description })
            .where(eq(schema.stocks.id, id))
            .returning();

        if (!updatedStock) {
            throw new Error('Stock cannot be updated.');
        }

        return updatedStock;
    },

    async createStockItem({ productId, stockId, quantity }: CreateStockItemPayload){
        const [newStockItem] = await db
            .insert(schema.stockItems)
            .values({ productId, stockId, quantity })
            .returning()

        return newStockItem
    },
    
    async addItemToStock({ stockId, productId, quantity }: AdjustStockPayload){
        const [updatedStockItem] = await db
            .update(schema.stockItems)
            .set({
                quantity: sql`${schema.stockItems.quantity} + ${quantity}`
            })
            .where(eq(schema.stockItems.productId, productId) && eq(schema.stockItems.stockId, stockId))
            .returning()
        
        if(!updatedStockItem){
            throw new Error('Stock item not found.Create item first')
        }

        return updatedStockItem
        
    },

    async removeItemFromStock({ productId, stockId, quantity }: AdjustStockPayload){
        const [updatedStockItem] = await db
            .update(schema.stockItems)
            .set({
                quantity: sql`${schema.stockItems.quantity} - ${quantity}`
            })
            .where(eq(schema.stockItems.productId, productId) && eq(schema.stockItems.stockId, stockId))
            .returning()
        
        if(!updatedStockItem){
            throw new Error('Stock item not found. Cannot remove non-existent item')
        }

        return updatedStockItem
    },

    async getProductTotalQuantity(productId: string) {
        const result = await db
            .select({ totalQuantity: sql<number>`sum(${schema.stockItems.quantity})` })
            .from(schema.stockItems)
            .where(eq(schema.stockItems.productId, productId));

        return result[0]?.totalQuantity || 0;
    },
}