import { Router } from "express";

import OrdersController from "../controllers/ordersController.js";

const OrdersRouter = new Router();

OrdersRouter.get("/", OrdersController.getAll);

OrdersRouter.post("/", OrdersController.createOne);

OrdersRouter.put("/:id", OrdersController.updateOne);

OrdersRouter.delete("/:id", OrdersController.deleteOne);

export default OrdersRouter;