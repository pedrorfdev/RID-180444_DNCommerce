import { eq, sql } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { stockService } from "../stock/stock-service.ts";

type CreateProductPayload = {
    name: string;
    description: string;
    price: string;
    stockId: string;
    quantity: number;
}

interface UpdateProductPayload {
    id: string;
    name?: string;
    description?: string;
    price?: string;
}

export const productService = {
    async create({ name, description, price, stockId, quantity }: CreateProductPayload) {
        const [newProduct] = await db
            .insert(schema.products)
            .values({
                productName: name,
                productPrice: price,
                productDescription: description
            })
            .returning()

        let newStockItem = null;
        if (newProduct) {
            newStockItem = await stockService.createStockItem({
                productId: newProduct.id,
                stockId: stockId,
                quantity: quantity
            });
        }

        return {
            id: newProduct.id,
            name: newProduct.productName,
            description: newProduct.productDescription,
            price: newProduct.productPrice,
            quantity: newStockItem ? newStockItem.quantity : 0
        }
    },
    
    async getAll() {
        const result = await db
            .select({
                id: schema.products.id,
                name: schema.products.productName,
                description: schema.products.productDescription,
                price: schema.products.productPrice,
                totalQuantity: sql<number>`sum(${schema.stockProducts.quantity})`
            })
            .from(schema.products)
            .leftJoin(schema.stockProducts, eq(schema.products.id, schema.stockProducts.productId))
            .groupBy(schema.products.id)

        return result
    },
    
    async getById(productId: string) {
        const product = await db
            .select({
                id: schema.products.id,
                name: schema.products.productName,
                description: schema.products.productDescription,
                price: schema.products.productPrice,
                totalQuantity: sql<number>`sum(${schema.stockProducts.quantity})`
            })
            .from(schema.products)
            .leftJoin(schema.stockProducts, eq(schema.products.id, schema.stockProducts.productId))
            .where(eq(schema.products.id, productId))
            .groupBy(schema.products.id)
            .limit(1)

        return product[0] || null
    },
    
    async update({ id, name, description, price }: UpdateProductPayload) {
        const updateData: { productName?: string; productDescription?: string; productPrice?: string } = {};

        if (name !== undefined) updateData.productName = name;
        if (description !== undefined) updateData.productDescription = description;
        if (price !== undefined) updateData.productPrice = price;

        const [updatedProduct] = await db
            .update(schema.products)
            .set(updateData)
            .where(eq(schema.products.id, id))
            .returning();


        if (!updatedProduct) {
            throw new Error('Product not found.');
        }

        return {
            id: updatedProduct.id,
            name: updatedProduct.productName,
            description: updatedProduct.productDescription,
            price: updatedProduct.productPrice
        };
    },
    
    async delete(productId: string) {
        const [deletedProduct] = await db
            .delete(schema.products)
            .where(eq(schema.products.id, productId))
            .returning()

        if (!deletedProduct) {
            throw new Error('Product not found!');
        }

        return {
            id: deletedProduct.id,
            name: deletedProduct.productName,
        };
    },
}