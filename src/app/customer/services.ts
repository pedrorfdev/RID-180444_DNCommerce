import { eq } from "drizzle-orm"
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"

type CustomerPayload = {
    name: string
    email: string
    password: string
}

interface UpdateCustomerPayload {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}

export const customerService = {
    async create({ name, email, password }: CustomerPayload) {
        // const existingCustomer = await db
        //     .select()
        //     .from(schema.customers)
        //     .where(eq(schema.customers.customerEmail, email))

        // if (existingCustomer) {
        //     throw new Error('There is already a customer with this email.');
        // }

        const [newCustomer] = await db
            .insert(schema.customers)
            .values({
                customerName: name,
                customerEmail: email,
                customerPassword: password
            })
            .returning()

        return {
            id: newCustomer.id,
            name: newCustomer.customerName,
            email: newCustomer.customerEmail
        }
    },

    async getAll() {
        const result = await db.select().from(schema.customers)
        return result
    },

    async getById(customerId: string) {
        const customer = await db
            .select()
            .from(schema.customers)
            .where(eq(schema.customers.id, customerId))

        return customer
    },

    async update({ id, name, email, password }: UpdateCustomerPayload) {
        const updateData: { customerName?: string; customerEmail?: string; customerPassword?: string } = {};

        if (name !== undefined) updateData.customerName = name;
        if (email !== undefined) updateData.customerEmail = email;
        if (password !== undefined) updateData.customerPassword = password;

        const [updatedCustomer] = await db
            .update(schema.customers)
            .set(updateData)
            .where(eq(schema.customers.id, id))
            .returning();


        if (!updatedCustomer) {
            throw new Error('Customer not found.');
        }

        return {
            id: updatedCustomer.id,
            name: updatedCustomer.customerName,
            email: updatedCustomer.customerEmail,
        };
    },

    async delete(customerId: string) {
        const [deletedCustomer] = await db
            .delete(schema.customers)
            .where(eq(schema.customers.id, customerId))
            .returning()

        if (!deletedCustomer) {
            throw new Error('Cliente não encontrado.');
        }

        return {
            id: deletedCustomer.id,
            name: deletedCustomer.customerName,
        };
    },
}