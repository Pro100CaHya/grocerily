import { Router } from "express";

import CustomersController from "../controllers/customersController.js";

const CustomersRouter = new Router();

CustomersRouter.get("/", CustomersController.getAll);
CustomersRouter.get("/:id", CustomersController.getOne);
CustomersRouter.get("/getByUserId", CustomersController.getByUserId);

CustomersRouter.post("/", CustomersController.createOne);

CustomersRouter.put("/:id", CustomersController.updateOne);

CustomersRouter.delete("/:id", CustomersController.deleteOne);

export default CustomersRouter;