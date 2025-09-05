import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { eq } from 'drizzle-orm';
import { stockService } from '../stock/stock-service.ts';

interface CreateOrderPayload {
    customerId: string;
    products: {
        productId: string
        quantity: number
    }[]
}

interface UpdateOrderPayload {
    orderId: string;
}

export const orderService = {
    async create({ customerId, products }: CreateOrderPayload) {
        return await db.transaction(async (tx) => {
            const newOrder = await tx
                .insert(schema.orders)
                .values({ customerId })
                .returning();

            const orderProductsToInsert = [];

            for (const item of products) {
                await stockService.removeItemFromStock({
                    productId: item.productId,
                    quantity: item.quantity
                });

                const [productData] = await tx
                    .select()
                    .from(schema.products)
                    .where(eq(schema.products.id, item.productId));

                if (!productData) {
                    throw new Error(`Product with ID ${item.productId} not found.`);
                }

                orderProductsToInsert.push({
                    orderId: newOrder[0].id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: productData.productPrice
                });
            }

            await tx
                .insert(schema.orderProducts)
                .values(orderProductsToInsert);

            return newOrder[0];
        });
    },

    async getAll() {
        const orders = await db.select().from(schema.orders);
        return orders;
    },

    async getById(orderId: string) {
        const order = await db
            .select()
            .from(schema.orders)
            .where(eq(schema.orders.id, orderId));

        return order[0] || null;
    },

    async update({ orderId }: UpdateOrderPayload) {
        const [updatedOrder] = await db
            .update(schema.orders)
            .set({ orderDate: new Date() })
            .where(eq(schema.orders.id, orderId))
            .returning();

        return updatedOrder;
    },

    async delete(orderId: string) {
        const [deletedOrder] = await db
            .delete(schema.orders)
            .where(eq(schema.orders.id, orderId))
            .returning();

        if (!deletedOrder) {
            throw new Error("Order not found.");
        }

        return deletedOrder;
    }
};