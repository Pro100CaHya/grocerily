import UsersService from "../services/usersService.js";

class UsersController {
    async authorization(req, res) {
        const { username, password } = req.body;

        try {
            const user = await UsersService.authorization(username, password);

            res.status(200).json({
                message: "Успешная авторизация",
                data: user
            });
        } catch (error) {
            let errorStatus = 500;

            if (error.message === "Неверный логин/пароль") {
                errorStatus = 400;
            }

            console.log(error);

            res.status(errorStatus).json({
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const users = await UsersService.getAll(req.query.role);

            res.status(200).json({
                message: "Успешно",
                data: users
            })
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async getOne(req, res) {
        try {
            const user = await UsersService.getOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: user
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async updateOne(req, res) {
        const { username, password, role } = req.body;

        try {
            const updatedUser = await UsersService.updateOne(req.params.id, [username, password, role]);

            res.status(200).json({
                message: "Успешно",
                data: updatedUser
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }

    async registration(req, res) {
        const { username, password, role } = req.body;
        
        try {
            const candidate = await UsersService.registration(username, password, role);
            
            res.status(200).json({
                message: "Пользователь успешно зарегистрирован",
                data: candidate
            });
        } catch (error) {
            let errorStatus = 500;

            if (error.message === "Пользователь с таким username уже зарегистрирован") {
                errorStatus = 400;
            }

            console.log(error);

            res.status(errorStatus).json({
                message: error.message
            });
        }
    }

    async deleteOne(req, res) {
        try {
            const deletedUser = await UsersService.deleteOne(req.params.id);

            res.status(200).json({
                message: "Успешно",
                data: deletedUser
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new UsersController();