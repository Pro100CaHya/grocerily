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
import OperatorRemnantsList from "./pages/operator/remnants/OperatorRemnantsList";
import OperatorRemnantsInfo from "./pages/operator/remnants/OperatorRemnantsInfo";
import OperatorRemnantsAdd from "./pages/operator/remnants/OperatorRemnantsAdd";
import CustomerProductsList from "./pages/customer/products/CustomerProductsList";
import CustomerProductsInfo from "./pages/customer/products/CustomerProductsInfo";
import CustomerCategoriesList from "./pages/customer/categories/CustomerCategoriesList";
import CustomerSuppliersList from "./pages/customer/suppliers/CustomerSuppliersList";
import CustomerOrdersAdd from "./pages/customer/orders/CustomerOrdersAdd";
import CustomerOrdersList from "./pages/customer/orders/CustomersOrdersList";
import CustomerOrdersInfo from "./pages/customer/orders/CustomerOrdersInfo";
import OperatorExpiredProducts from "./pages/operator/products/OperatorExpiredProducts";
import CheckIsExpiredProduct from "./pages/CheckIsExpiredProduct";
import GetHoursTillExpiration from "./pages/GetHoursTillExpiration";
import GetProductsLessCount from "./pages/GetProductsLessCount";
import GetSuppliersThatHaveProducts from "./pages/GetSuppliersThatHaveProducts";

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
    }
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
    },
    {
        id: 14,
        path: "/remnants",
        element: <OperatorRemnantsList />
    },
    {
        id: 15,
        path: "/remnants/:id",
        element: <OperatorRemnantsInfo />
    },
    {
        id: 16,
        path: "/remnants/add",
        element: <OperatorRemnantsAdd />
    },
    {
        id: 17,
        path: "/products/getOneDayTillExpirationProducts",
        element: <OperatorExpiredProducts />
    },
    {
        id: 18,
        path: "/products/checkIsExpired",
        element: <CheckIsExpiredProduct />
    },
    {
        id: 19,
        path: "/products/getHoursTillExpiration",
        element: <GetHoursTillExpiration />
    },
    {
        id: 20,
        path: "/products/getProductsLessCount",
        element: <GetProductsLessCount />
    },
    {
        id: 21,
        path: "/products/getSuppliersThatHaveProducts",
        element: <GetSuppliersThatHaveProducts />
    }
];

export const customerRoutes = [
    {
        id: 0,
        path: "/",
        element: <CustomerProductsList />
    },
    {
        id: 1,
        path: "/authorization",
        element: <Navigate to="/"/>
    },
    {
        id: 2,
        path: "/products",
        element: <CustomerProductsList />
    },
    {
        id: 3,
        path: "/products/:id",
        element: <CustomerProductsInfo />
    },
    {
        id: 4,
        path: "/categories",
        element: <CustomerCategoriesList />
    },
    {
        id: 5,
        path: "/suppliers",
        element: <CustomerSuppliersList />
    },
    {
        id: 6,
        path: "/orders/add",
        element: <CustomerOrdersAdd />
    },
    {
        id: 7,
        path: "/orders",
        element: <CustomerOrdersList />
    },
    {
        id: 8,
        path: "/orders/:id",
        element: <CustomerOrdersInfo />
    },
    {
        id: 9,
        path: "/products/checkIsExpired",
        element: <CheckIsExpiredProduct />
    },
    {
        id: 10,
        path: "/products/getHoursTillExpiration",
        element: <GetHoursTillExpiration />
    }
]