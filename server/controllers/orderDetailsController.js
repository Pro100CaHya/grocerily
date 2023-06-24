import OrderDetailsService from "../services/orderDetailsService.js";

class OrderDetailsController {
    async createOne(req, res) {
        const { count, product, order, remnant } = req.body;

        try {
            const createdOrderDetail = await OrderDetailsService.createOne([count, product, order, remnant]);

            res.status(200).json({
                message: "Успешно",
                data: createdOrderDetail
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
            const deletedOrderDetail = await OrderDetailsService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedOrderDetail
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
            const orderDetails = await OrderDetailsService.getAll();

            res.status(200).json({
                message: "Успешно",
                data: orderDetails
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getByOrder(req, res) {
        try {
            const orderDetails = await OrderDetailsService.getByOrder(req.query.order);

            res.status(200).json({
                message: "Успешно",
                data: orderDetails
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { count, product, order, remnant } = req.body;

        try {
            const updatedOrderDetail = await OrderDetailsService.updateOne(req.params.id, [count, product, order, remnant]);

            res.status(200).json({
                message: "Успешно",
                data: updatedOrderDetail
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new OrderDetailsController();