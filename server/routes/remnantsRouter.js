import { Router } from "express";

import RemnantsController from "../controllers/remnantsController.js";

const RemnantsRouter = new Router();

RemnantsRouter.get("/", RemnantsController.getAll);

RemnantsRouter.post("/", RemnantsController.createOne);

RemnantsRouter.put("/:id", RemnantsController.updateOne);

RemnantsRouter.delete("/:id", RemnantsController.deleteOne);

export default RemnantsRouter;