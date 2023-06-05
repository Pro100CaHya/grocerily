import CategoriesService from "../services/categoriesService.js";

class CategoriesController {
    async createOne(req, res) {
        const { name } = req.body;

        try {
            const createdCategory = await CategoriesService.createOne([name]);

            res.status(200).json({
                message: "Успешно",
                data: createdCategory
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
            const deletedCategory = await CategoriesService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedCategory
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
            const categories = await CategoriesService.getAll();

            res.status(200).json({
                message: "Успешно",
                data: categories
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { name } = req.body;

        try {
            const updatedCategory = await CategoriesService.updateOne(req.params.id, [name]);

            res.status(200).json({
                message: "Успешно",
                data: updatedCategory
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new CategoriesController();
