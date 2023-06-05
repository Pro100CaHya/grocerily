import { Router } from "express";

import UsersController from "../controllers/usersController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const UsersRouter = new Router();

UsersRouter.get("/", roleMiddleware(["admin"]), UsersController.getAll);

UsersRouter.post("/authorization", UsersController.authorization);
UsersRouter.post("/registration", UsersController.registration);


export default UsersRouter;