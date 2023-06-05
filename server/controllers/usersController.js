import UsersService from "../services/usersService.js";

class UsersController {
    async authorization(req, res) {
        const { username, password } = req.body;

        try {
            const authorization = await UsersService.authorization(username, password);

            res.status(200).json({
                message: "Успешная авторизация",
                token: authorization
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
            const users = await UsersService.getAll();

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
}

export default new UsersController();