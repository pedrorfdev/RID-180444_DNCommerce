import { eq } from "drizzle-orm";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

type ProductPayload = {
    name: string;
    description: string;
    price: string;
}

interface UpdateProductPayload {
    id: string;
    name?: string;
    description?: string;
    price?: string;
}

export const productService = {
    async create({ name, description, price }: ProductPayload) {
        const [newProduct] = await db
            .insert(schema.products)
            .values({
                productName: name,
                productPrice: price,
                productDescription: description
            })
            .returning()

        return {
            id: newProduct.id,
            name: newProduct.productName,
            description: newProduct.productDescription,
            price: newProduct.productPrice
        }
    },
    
    async getAll() {
        const result = await db.select().from(schema.products)
        return result
    },
    
    async getById(productId: string) {
        const product = await db
            .select()
            .from(schema.products)
            .where(eq(schema.products.id, productId))

        return product
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