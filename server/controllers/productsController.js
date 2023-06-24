import ProductsService from "../services/productsService.js";
import ExcelService from "../services/excelService.js";

class SuppliersController {
    async createOne(req, res) {
        const { name, base_price, unit, weight, is_perishable, category, supplier } = req.body;

        try {
            const createdProduct = await ProductsService.createOne([name, base_price, unit, weight, is_perishable, category, supplier]);

            res.status(200).json({
                message: "Успешно",
                data: createdProduct
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteOne(req, res) {
        try {
            const deletedProduct = await ProductsService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedProduct
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            if (req.query.getProductsByCategoryWithPricesFile === "true") {
                const products = await ProductsService.getProductsByCategoryWithPrices();

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
            }
            const products = await ProductsService.getAll(req.query.category_and_supplier_name, req.query.getOneDayTillExpirationProducts, req.query.count);

            res.status(200).json({
                message: "Успешно",
                data: products
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getOne(req, res) {
        try {
            const product = await ProductsService.getOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: product
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getOneDayTillExpirationProducts(req, res) {
        try {
            // const product = await ProductsService.getOneDayTillExpirationProducts();

            res.status(200).json({
                message: "Успешно",
                data: "product"
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { name, base_price, unit, weight, is_perishable, category, supplier } = req.body;

        try {
            const updatedProduct = await ProductsService.updateOne(req.params.id, [name, base_price, unit, weight, is_perishable, category, supplier]);

            res.status(200).json({
                message: "Успешно",
                data: updatedProduct
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new SuppliersController();
