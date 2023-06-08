import { Router } from "express";

import CategoriesController from "../controllers/categoriesController.js";

const CategoriesRouter = new Router();

CategoriesRouter.get("/", CategoriesController.getAll);
CategoriesRouter.get("/:id", CategoriesController.getOne);

CategoriesRouter.post("/", CategoriesController.createOne);

CategoriesRouter.put("/:id", CategoriesController.updateOne);

CategoriesRouter.delete("/:id", CategoriesController.deleteOne);

export default CategoriesRouter;