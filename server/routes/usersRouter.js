import { Router } from "express";

import UsersController from "../controllers/usersController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const UsersRouter = new Router();

UsersRouter.get("/", UsersController.getAll);
UsersRouter.get("/:id", UsersController.getOne);

UsersRouter.post("/authorization", UsersController.authorization);
UsersRouter.post("/registration", UsersController.registration);

UsersRouter.put("/:id", UsersController.updateOne);

UsersRouter.delete("/:id", UsersController.deleteOne);

export default UsersRouter;