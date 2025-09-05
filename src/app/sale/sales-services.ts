import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { eq } from 'drizzle-orm';

interface CreateSalePayload {
    orderId: string;
}

export const salesService = {
     async create({ orderId }: CreateSalePayload) {
        return await db.transaction(async (tx) => {
            const orderItems = await tx
                .select()
                .from(schema.orderProducts)
                .where(eq(schema.orderProducts.orderId, orderId));
            
            if (orderItems.length === 0) {
                throw new Error("Order not found or has no products.");
            }

            let totalValue = 0;
            for (const item of orderItems) {
                const itemTotal = Number(item.unitPrice) * item.quantity;
                totalValue += itemTotal;
            }

            const [newSale] = await tx
                .insert(schema.sales)
                .values({
                    orderId: orderId,
                    saleValue: totalValue.toString()
                })
                .returning();
            
            return newSale;
        });
    },

    async getAll() {
        const sales = await db.select().from(schema.sales);
        return sales;
    },

    async getById(saleId: string) {
        const sale = await db
            .select()
            .from(schema.sales)
            .where(eq(schema.sales.id, saleId));
            
        return sale[0] || null;
    },
};