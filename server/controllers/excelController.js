import ExcelService from "../services/excelService.js";
import { pool } from "../config/db.js";

class ExcelController {
    async getProductsByCategoryWithPrices(req, res) {
        try {
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

            const columns = [
                {
                    key: "category_name",
                    header: "Категория"
                },
                {
                    key: "product_name",
                    header: "Продукт"
                },
                {
                    key: "old_price",
                    header: "Старая цена"
                },
                {
                    key: "new_price",
                    header: "Новая цена"
                }
            ]
            const file = await ExcelService.write(products.rows, columns);
            res.download("data.xlsx");
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new ExcelController();