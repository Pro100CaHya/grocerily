import { Router } from "express";

import SuppliersRouter from "./suppliersRouter.js";
import UsersRouter from "./usersRouter.js";
import CustomersRouter from "./customersRouter.js";
import OrdersRouter from "./ordersRouter.js";
import OrderDetailsRouter from "./orderDetailsRouter.js";
import CategoriesRouter from "./categoriesRouter.js";
import ProductsRouter from "./productsRouter.js";
import RemnantsRouter from "./remnantsRouter.js";
import ExcelRouter from "./excelRouter.js";

const router = new Router();

router.use("/suppliers", SuppliersRouter);
router.use("/users", UsersRouter);
router.use("/customers", CustomersRouter);
router.use("/orders", OrdersRouter);
router.use("/order_details/", OrderDetailsRouter);
router.use("/categories", CategoriesRouter);
router.use("/products", ProductsRouter);
router.use("/remnants", RemnantsRouter);
router.use("/excel", ExcelRouter);

export default router;