import RemnantsService from "../services/remnantsService.js";

class RemnantsController {
    async createOne(req, res) {
        const { count, actual_price, delivery_date, expire_date, product } = req.body;

        try {
            const createdRemnant = await RemnantsService.createOne([count, actual_price, delivery_date, expire_date, product]);

            res.status(200).json({
                message: "Успешно",
                data: createdRemnant
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
            const deletedRemnant = await RemnantsService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedRemnant
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
            const remnants = await RemnantsService.getAll(req.query.product, req.query.updatePrices);

            res.status(200).json({
                message: "Успешно",
                data: remnants
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
            const remnant = await RemnantsService.getOne(req.params.id, req.query.checkForExpire, req.query.getHoursTillExpiration);

            res.status(200).json({
                message: "Успешно",
                data: remnant
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { count, actual_price, delivery_date, expire_date, product } = req.body;

        try {
            const updatedRemnant = await RemnantsService.updateOne(req.params.id, [count, actual_price, delivery_date, expire_date, product]);

            res.status(200).json({
                message: "Успешно",
                data: updatedRemnant
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new RemnantsController();
