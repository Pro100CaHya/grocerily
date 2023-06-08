import { pool } from "../config/db.js";

class CategoriesService {
    async createOne(fields) {
        const createdCategory = await pool.query(`
            INSERT INTO "categories" ("name")
            VALUES ($1)
            RETURNING *;
        `, fields);

        return createdCategory;
    }

    async deleteOne(id) {
        const deletedCategory = await pool.query(`
            DELETE FROM "categories"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedCategory;
    }

    async getAll() {
        const categories = await pool.query(`
            SELECT *
            FROM "categories"
            ORDER BY "id"
        `);

        return categories;
    }

    async getOne(id) {
        let sqlQuery = `
            SELECT *
            FROM "categories"
            WHERE "id" = ${id}
        `;

        const category = await pool.query(sqlQuery);

        return category;
    }

    async updateOne(id, fields) {
        const updatedCategory = await pool.query(`
            UPDATE "categories"
            SET "name" = $1
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedCategory;
    }
}

export default new CategoriesService();