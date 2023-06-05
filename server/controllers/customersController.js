import CustomersService from "../services/customersService.js";

class CustomersController {
    async createOne(req, res) {
        const { surname, name, patronym, telephone, user } = req.body;

        try {
            const createdCustomer = await CustomersService.createOne([surname, name, patronym, telephone, user]);

            res.status(200).json({
                message: "Успешно",
                data: createdCustomer
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
            const deletedCustomer = await CustomersService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedCustomer
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
            const customers = await CustomersService.getAll();

            res.status(200).json({
                message: "Успешно",
                data: customers
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { surname, name, patronym, telephone, user } = req.body;

        try {
            const updatedCustomer = await CustomersService.updateOne(req.params.id, [surname, name, patronym, telephone, user]);

            res.status(200).json({
                message: "Успешно",
                data: updatedCustomer
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new CustomersController();
