import { Router } from "express";

import SuppliersController from "../controllers/suppliersController.js";

const SuppliersRouter = new Router();

SuppliersRouter.get("/", SuppliersController.getAll);

SuppliersRouter.post("/", SuppliersController.createOne);

SuppliersRouter.put("/:id", SuppliersController.updateOne);

SuppliersRouter.delete("/:id", SuppliersController.deleteOne);

export default SuppliersRouter;