import { pool } from "../config/db.js";

class OrdersDetailsService {
    async createOne(fields) {
        const createdOrderDetail = await pool.query(`
            INSERT INTO "order_details" ("count", "product", "order", "remnant")
            VALUES ($1, $2, $3, $4)
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

    async getByOrder(order) {
        const orderDetails = await pool.query(`
            SELECT *
            FROM "order_details"
            WHERE "order" = ${order}
        `);

        return orderDetails;
    }

    async updateOne(id, fields) {
        const updatedOrderDetail = await pool.query(`
            UPDATE "order_details"
            SET "count" = $1,
                "product" = $2,
                "order" = $3,
                "remnant" = $4
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedOrderDetail;
    }
}

export default new OrdersDetailsService();