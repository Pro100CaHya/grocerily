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

    async getAll(product, updatePrices) {
        let sqlQuery = `
            SELECT "remnants"."id",
                "products"."name" AS "product_name",
                "products"."id" AS "product_id",
                "remnants"."count",
                "remnants"."actual_price",
                "remnants"."delivery_date",
                "remnants"."expire_date"
            FROM "remnants"
            JOIN "products" ON "remnants"."product" = "products"."id"
            ORDER BY "products"."name", "remnants"."id"
        `;

        if (product !== undefined) {
            sqlQuery = `
                SELECT *
                FROM "remnants"
                WHERE "product" = '${product}'
            `;
        }

        if (updatePrices === "true") {
            sqlQuery = `
                CALL decrease_prices();
            `;
        }

        const remnants = await pool.query(sqlQuery);

        return remnants;
    }

    async getOne(id, checkForExpire, getHoursTillExpiration) {
        let sqlQuery = `
            SELECT *
            FROM "remnants"
            WHERE "id" = ${id}
        `;

        if (checkForExpire === "true") {
            sqlQuery = `
                SELECT *
                FROM check_product_for_expire(${id})
            `;
        }

        if (getHoursTillExpiration === "true") {
            sqlQuery = `
                SELECT *
                FROM get_hours_till_expiration(${id})
            `;
        }

        const remnant = await pool.query(sqlQuery);

        return remnant;
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