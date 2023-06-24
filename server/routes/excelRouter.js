import { Router } from "express";

import ExcelController from "../controllers/excelController.js";

const ExcelRouter = new Router();

ExcelRouter.get("/productsByCategoryWithPrices", ExcelController.getProductsByCategoryWithPrices);

export default ExcelRouter;