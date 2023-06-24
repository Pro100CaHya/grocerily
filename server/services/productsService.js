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

    async getAll(category_and_supplier_name, getOneDayTillExpirationProducts, count) {
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

        if (getOneDayTillExpirationProducts === "true") {
            sqlQuery = `
                SELECT * FROM get_one_day_till_expirartion_remnants()
            `;
        }

        if (count !== undefined) {
            sqlQuery = `
                SELECT
                    "products"."id" AS id,
                    "products"."name" AS product_name,
                    SUM("remnants"."count") AS count
                FROM
                    "products"
                JOIN
                    "remnants" ON "remnants"."product" = "products"."id"
                GROUP BY
                    "products"."id",
                    "products"."name"
                HAVING
                    SUM("remnants"."count") < ${count}
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

    async getOneDayTillExpirationProducts() {
        let sqlQuery = `
            SELECT * FROM get_one_day_till_expirartion_remnants()
        `;

        const remnant = await pool.query(sqlQuery);

        return remnant;
    }

    async getProductsByCategoryWithPrices() {
        const products = await pool.query(`SELECT
                                            "categories"."name" as category_name,
                                            "products"."name" as product_name,
                                            "remnants"."actual_price" as old_price,
                                            CASE
                                                WHEN "products"."is_perishable" = true AND "remnants"."actual_price" * 0.2 > 50 THEN 50
                                                WHEN "products"."is_perishable" = true AND "remnants"."actual_price" * 0.2 <= 50 THEN "remnants"."actual_price" * 0.8
                                                ELSE null
                                            END as new_price
                                        FROM
                                            "categories",
                                            "products",
                                            "remnants"
                                        WHERE
                                            "categories"."id" = "products"."category" AND
                                            "products"."id" = "remnants"."product" 
                                        GROUP BY
                                            "categories"."name",
                                            "products"."name",
                                            "remnants"."actual_price",
                                            "products"."is_perishable"`);

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