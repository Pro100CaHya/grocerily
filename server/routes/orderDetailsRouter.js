import { Router } from "express";

import OrderDetailsController from "../controllers/orderDetailsController.js";

const OrderDetailsRouter = new Router();

OrderDetailsRouter.get("/", OrderDetailsController.getAll);

OrderDetailsRouter.post("/", OrderDetailsController.createOne);

OrderDetailsRouter.put("/:id", OrderDetailsController.updateOne);

OrderDetailsRouter.delete("/:id", OrderDetailsController.deleteOne);

export default OrderDetailsRouter;