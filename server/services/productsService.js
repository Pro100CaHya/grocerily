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

    async getAll(category_and_supplier_name) {
        let sqlQuery = `
            SELECT *
            FROM "products"
            ORDER BY "id"
        `;

        if (category_and_supplier_name === "true") {
            sqlQuery = `
                SELECT
                    products.id,
                    products.name,
                    products.base_price,
                    products.unit,
                    products.weight,
                    products.is_perishable,
                    categories.name as category_name,
                    suppliers.name as supplier_name
                FROM
                    products
                JOIN
                    categories ON categories.id = products.category
                JOIN
                    suppliers ON suppliers.id = products.supplier
                ORDER BY "id"
            `;
        }

        const products = await pool.query(sqlQuery);

        return products;
    }

    async getOne(id) {
        let sqlQuery = `
            SELECT *
            FROM "products"
            WHERE "id" = ${id}
        `;

        const product = await pool.query(sqlQuery);

        return product;
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