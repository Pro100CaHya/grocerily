import { pool } from "../config/db.js";

class OrdersDetailsService {
    async createOne(fields) {
        const createdOrderDetail = await pool.query(`
            INSERT INTO "orders_details" ("count", "product", "order")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, fields);

        return createdOrderDetail;
    }

    async deleteOne(id) {
        const deletedOrderDetail = await pool.query(`
            DELETE FROM "order_details"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedOrderDetail;
    }

    async getAll() {
        const orderDetails = await pool.query(`
            SELECT *
            FROM "order_details"
        `);

        return orders;
    }

    async updateOne(id, fields) {
        const updatedOrderDetail = await pool.query(`
            UPDATE "orders"
            SET "count" = $1,
                "product" = $2,
                "order" = $3
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedOrderDetail;
    }
}

export default new OrdersDetailsService();