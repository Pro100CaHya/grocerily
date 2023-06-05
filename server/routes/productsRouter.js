import { Router } from "express";

import ProductsController from "../controllers/productsController.js";

const ProductsRouter = new Router();

ProductsRouter.get("/", ProductsController.getAll);

ProductsRouter.post("/", ProductsController.createOne);

ProductsRouter.put("/:id", ProductsController.updateOne);

ProductsRouter.delete("/:id", ProductsController.deleteOne);

export default ProductsRouter;