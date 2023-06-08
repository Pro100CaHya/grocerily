import ProductsService from "../services/productsService.js";

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
            const products = await ProductsService.getAll(req.query.category_and_supplier_name);

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
