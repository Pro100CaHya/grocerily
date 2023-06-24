import { pool } from "../config/db.js";

class OrdersService {
    async createOne(fields) {
        const createdOrder = await pool.query(`
            INSERT INTO "orders" ("sum", "status", "customer")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, fields);

        return createdOrder;
    }

    async deleteOne(id) {
        const deletedOrder = await pool.query(`
            DELETE FROM "orders"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedOrder;
    }

    async getAll() {
        const orders = await pool.query(`
            SELECT *
            FROM "orders"
            ORDER BY "id"
        `);

        return orders;
    }

    async getByCustomer(customer) {
        const orders = await pool.query(`
            SELECT *
            FROM "orders"
            WHERE "customer" = ${customer}
            ORDER BY "id"
        `);

        return orders;
    }

    async updateOne(id, fields) {
        const updatedOrder = await pool.query(`
            UPDATE "orders"
            SET "sum" = $1,
                "status" = $2,
                "customer" = $3
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedOrder;
    }
}

export default new OrdersService();