import { and, eq, sql } from "drizzle-orm";
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
    async create({ name, description }: CreateStockPayload) {
        const [newStock] = await db
            .insert(schema.stocks)
            .values({ stockName: name, stockDescription: description })
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
        const updateData: { stockName?: string; stockDescription?: string } = {};

        if (name !== undefined) updateData.stockName = name;
        if (description !== undefined) updateData.stockDescription = description;

        const [updatedStock] = await db
            .update(schema.stocks)
            .set(updateData)
            .where(eq(schema.stocks.id, id))
            .returning();

        if (!updatedStock) {
            throw new Error('Stock cannot be updated.');
        }

        return updatedStock;
    },

    async createStockItem({ productId, stockId, quantity }: CreateStockItemPayload) {
        const [newStockItem] = await db
            .insert(schema.stockProducts)
            .values({ productId, stockId, quantity })
            .returning()

        return newStockItem
    },

    async addItemToStock({ stockId, productId, quantity }: AdjustStockPayload) {
        const [updatedStockItem] = await db
            .update(schema.stockProducts)
            .set({
                quantity: sql`${schema.stockProducts.quantity} + ${quantity}`
            })
            .where(and(eq(schema.stockProducts.productId, productId), eq(schema.stockProducts.stockId, stockId)))
            .returning()

        if (!updatedStockItem) {
            throw new Error('Stock item not found.Create item first')
        }

        return updatedStockItem

    },

    async removeItemFromStock({ productId, quantity }: { productId: string, quantity: number }) {
        const stockItems = await db
            .select()
            .from(schema.stockProducts)
            .where(eq(schema.stockProducts.productId, productId))
            .orderBy(schema.stockProducts.quantity) // Exemplo: Remove do estoque com menos itens primeiro
            .limit(1);

        if (!stockItems[0]) {
            throw new Error(`Product with ID ${productId} has no registered stock.`);
        }

        const currentStockId = stockItems[0].stockId;

        const [updatedStockItem] = await db
            .update(schema.stockProducts)
            .set({
                quantity: sql`${schema.stockProducts.quantity} - ${quantity}`,
            })
            .where(eq(schema.stockProducts.productId, productId) && eq(schema.stockProducts.stockId, currentStockId))
            .returning();

        if (!updatedStockItem || updatedStockItem.quantity < 0) {
            throw new Error(`Not enough stock to fulfill the order for product ${productId}.`);
        }

        return updatedStockItem;
    },

    async getProductTotalQuantity(productId: string) {
        const result = await db
            .select({ totalQuantity: sql<number>`sum(${schema.stockProducts.quantity})` })
            .from(schema.stockProducts)
            .where(eq(schema.stockProducts.productId, productId));

        return result[0]?.totalQuantity || 0;
    },
}