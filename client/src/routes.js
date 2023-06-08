import { Navigate } from "react-router-dom";

import Auth from "./pages/Auth";

import OperatorProductList from "./pages/operator/products/OperatorProductList";
import OperatorProductInfo from "./pages/operator/products/OperatorProductInfo";
import OperatorProductAdd from "./pages/operator/products/OperatorProductAdd";
import OperatorSuppliersList from "./pages/operator/suppliers/OperatorSuppliersList";
import OperatorSuppliersInfo from "./pages/operator/suppliers/OperatorSuppliersInfo";
import OperatorSuppliersAdd from "./pages/operator/suppliers/OperatorSuppliersAdd";
import OperatorCategoriesList from "./pages/operator/categories/OperatorCategoriesList";
import OperatorCategoriesInfo from "./pages/operator/categories/OperatorCategoriesInfo";
import OperatorCategoriesAdd from "./pages/operator/categories/OperatorCategoriesAdd";
import OperatorCustomersList from "./pages/operator/clients/OperatorCustomersList";
import OperatorCustomersInfo from "./pages/operator/clients/OperatorCustomersInfo";
import OperatorCustomersAdd from "./pages/operator/clients/OperatorCustomersAdd";

export const publicRoutes = [
    {
        id: 0,
        path: "/authorization",
        element: <Auth />
    },
    {
        id: 1,
        path: "*",
        element: <Navigate to="/authorization"/>
    },
];

export const operatorRoutes = [
    {
        id: 0,
        path: "/",
        element: <OperatorProductList />
    },
    {
        id: 1,
        path: "/authorization",
        element: <Navigate to="/"/>
    },
    {
        id: 2,
        path: "/products",
        element: <OperatorProductList />
    },
    {
        id: 3,
        path: "/products/:id",
        element: <OperatorProductInfo />
    },
    {
        id: 4,
        path: "/products/add",
        element: <OperatorProductAdd />
    },
    {
        id: 5,
        path: "/suppliers",
        element: <OperatorSuppliersList />
    },
    {
        id: 6,
        path: "/suppliers/:id",
        element: <OperatorSuppliersInfo />
    },
    {
        id: 7,
        path: "/suppliers/add",
        element: <OperatorSuppliersAdd />
    },
    {
        id: 8,
        path: "/categories",
        element: <OperatorCategoriesList />
    },
    {
        id: 9,
        path: "/categories/:id",
        element: <OperatorCategoriesInfo />
    },
    {
        id: 10,
        path: "/categories/add",
        element: <OperatorCategoriesAdd />
    },
    {
        id: 11,
        path: "/customers",
        element: <OperatorCustomersList />
    },
    {
        id: 12,
        path: "/customers/:id",
        element: <OperatorCustomersInfo />
    },
    {
        id: 13,
        path: "/customers/add",
        element: <OperatorCustomersAdd />
    }
];