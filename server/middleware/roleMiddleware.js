import jwt from "jsonwebtoken";

function roleMiddleware(roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                throw Error ("Пользователь не авторизован");
            }

            const {role: userrole} = jwt.verify(token, process.env.SECRET_KEY);

            if (!roles.includes(userrole)) {
                throw Error ("Нет доступа");
            }

            next();
        } catch (error) {
            let errorStatus = 500;

            if (error.message === "Пользователь не авторизован" || error.message === "Нет доступа") {
                errorStatus = 403;
            }

            console.log(error);

            res.status(errorStatus).json({
                message: error.message
            });
        }
    }
};

export default roleMiddleware;