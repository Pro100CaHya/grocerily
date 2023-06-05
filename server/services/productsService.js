import { pool } from "../config/db.js";

class ProductsService {
    async createOne(fields) {
        const createdProduct = await pool.query(`
            INSERT INTO "products" ("name", "base_price", "unit", "weight", "is_perishable", "category", "supplier")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `, fields);

        return createdProduct;
    }

    async deleteOne(id) {
        const deletedProduct = await pool.query(`
            DELETE FROM "products"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedProduct;
    }

    async getAll() {
        const products = await pool.query(`
            SELECT *
            FROM "products"
        `);

        return products;
    }

    async updateOne(id, fields) {
        const updatedProduct = await pool.query(`
            UPDATE "products"
            SET "name" = $1,
                "base_price" = $2,
                "unit" = $3,
                "weight" = $4,
                "is_perishable" = $5,
                "category" = $6,
                "supplier" = $7
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedProduct;
    }
}

export default new ProductsService();