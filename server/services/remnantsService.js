import { pool } from "../config/db.js";

class RemnantsService {
    async createOne(fields) {
        const createdRemnant = await pool.query(`
            INSERT INTO "remnants" ("count", "actual_price", "delivery_date", "expire_date", "product")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, fields);

        return createdRemnant;
    }

    async deleteOne(id) {
        const deletedRemnant = await pool.query(`
            DELETE FROM "remnants"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedRemnant;
    }

    async getAll(product) {
        let sqlQuery = `
            SELECT *
            FROM "remnants"
            ORDER BY "id"
        `;

        if (product !== undefined) {
            sqlQuery = `
                SELECT *
                FROM "remnants"
                WHERE "product" = '${product}'
            `;
        }

        const remnants = await pool.query(sqlQuery);

        return remnants;
    }

    async updateOne(id, fields) {
        const updatedRemnant = await pool.query(`
            UPDATE "remnants"
            SET "count" = $1,
                "actual_price" = $2,
                "delivery_date" = $3,
                "expire_date" = $4,
                "product" = $5
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedRemnant;
    }
}

export default new RemnantsService();