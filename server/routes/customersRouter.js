import { Router } from "express";

import CustomersController from "../controllers/customersController.js";

const CustomersRouter = new Router();

CustomersRouter.get("/", CustomersController.getAll);

CustomersRouter.post("/", CustomersController.createOne);

CustomersRouter.put("/:id", CustomersController.updateOne);

CustomersRouter.delete("/:id", CustomersController.deleteOne);

export default CustomersRouter;