import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { publicRoutes, customerRoutes, operatorRoutes, regularRoutes, adminRoutes } from "../routes";

import { UserContext } from "../context/UserContext";

const AppRouter = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <Routes>
            {
                user.role === null &&
                    publicRoutes.map((route) =>
                        <Route
                            key={route.id}
                            path={route.path}
                            element={route.element}
                        />
                    )
            }
            {
                user.role === "admin" &&
                    adminRoutes.map((route) =>
                        <Route
                            exact={true}
                            key={route.id}
                            path={route.path}
                            element={route.element}
                        />
                    )
            }
            {
                user.role === "operator" &&
                    operatorRoutes.map((route) =>
                        <Route
                            exact={true}
                            key={route.id}
                            path={route.path}
                            element={route.element}
                        />
                    )
            }
            {
                user.role === "customer" &&
                customerRoutes.map((route) =>
                    <Route
                        exact={true}
                        key={route.id}
                        path={route.path}
                        element={route.element}
                    />
                )
            }
            {
                user.role === "regular customer" &&
                regularRoutes.map((route) =>
                    <Route
                        exact={true}
                        key={route.id}
                        path={route.path}
                        element={route.element}
                    />
                )
            }
        </Routes>
    );
};

export default AppRouter;