import OrdersService from "../services/ordersService.js";

class OrdersController {
    async createOne(req, res) {
        const { sum, status, customer } = req.body;

        try {
            const createdOrder = await OrdersService.createOne([sum, status, customer]);

            res.status(200).json({
                message: "Успешно",
                data: createdOrder
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
            const deletedOrder = await OrdersService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedOrder
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
            const orders = await OrdersService.getAll();

            res.status(200).json({
                message: "Успешно",
                data: orders
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getByCustomer(req, res) {
        try {
            const orders = await OrdersService.getByCustomer(req.query.customer);

            res.status(200).json({
                message: "Успешно",
                data: orders
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { sum, status, customer } = req.body;

        try {
            const updatedOrder = await OrdersService.updateOne(req.params.id, [sum, status, customer]);

            res.status(200).json({
                message: "Успешно",
                data: updatedOrder
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new OrdersController();