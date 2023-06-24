import SuppliersService from "../services/suppliersService.js";

class SuppliersController {
    async createOne(req, res) {
        const { name, address, telephone } = req.body;

        try {
            const createdSuppplier = await SuppliersService.createOne([name, address, telephone]);

            res.status(200).json({
                message: "Успешно",
                data: createdSuppplier
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
            const deletedSuppplier = await SuppliersService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedSuppplier
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
            const suppliers = await SuppliersService.getAll(req.query.getSuppliersThatHaveGoods);

            res.status(200).json({
                message: "Успешно",
                data: suppliers
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
            const supplier = await SuppliersService.getOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: supplier
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { name, address, telephone } = req.body;

        try {
            const updatedSuppplier = await SuppliersService.updateOne(req.params.id, [name, address, telephone]);

            res.status(200).json({
                message: "Успешно",
                data: updatedSuppplier
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
