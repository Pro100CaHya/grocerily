import { pool } from "../config/db.js";

class SuppliersService {
    async createOne(fields) {
        const createdSuppplier = await pool.query(`
            INSERT INTO "suppliers" ("name", "address", "telephone")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, fields);

        return createdSuppplier;
    }

    async deleteOne(id) {
        const deletedSuppplier = await pool.query(`
            DELETE FROM "suppliers"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedSuppplier;
    }

    async getAll() {
        const suppliers = await pool.query(`
            SELECT *
            FROM "suppliers"
        `);

        return suppliers;
    }

    async updateOne(id, fields) {
        const updatedSuppplier = await pool.query(`
            UPDATE "suppliers"
            SET "name" = $1,
                "address" = $2,
                "telephone" = $3
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedSuppplier;
    }
}

export default new SuppliersService();