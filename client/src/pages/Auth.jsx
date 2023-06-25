import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import PageLayout from "../components/ui/PageLayout";

import { UsersService } from "../API/UsersService";
import { UserContext } from "../context/UserContext";
import { CustomersService } from "../API/CustomersService";

const Auth = () => {
    const [authData, setAuthData] = useState({
        username: "",
        password: "",
    });
    const [label, setLabel] = useState("");

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const buttonLoginHandler = async () => {
        const isInvalid = authData.username.length < 6 || authData.password.length < 6;

        if (isInvalid) {
            setLabel("Логин/пароль не могут быть короче 6 символов");

            return;
        }

        let authResponse;

        try {
            authResponse = await UsersService.authorization(authData);
        } catch (error) {
            setLabel("Неверный логин/пароль");

            return;
        }

        localStorage.setItem("username", authResponse.data.data.rows[0].username);
        localStorage.setItem("id", authResponse.data.data.rows[0].id);
        localStorage.setItem("role", authResponse.data.data.rows[0].role);

        let user;

        if (authResponse.data.data.rows[0].role === "customer" ||
            authResponse.data.data.rows[0].role === "regular customer") {
                const customersRes = await CustomersService.getAll();
                user = customersRes.data.data.rows.find((customer) => customer.user == authResponse.data.data.rows[0].id);

                localStorage.setItem("userId", user.id);
        }

        setUser({
            username: authResponse.data.data.rows[0].username,
            id: authResponse.data.data.rows[0].id,
            role: authResponse.data.data.rows[0].role,
            userId: user?.id
        });
    }

    return (
        <>
            <PageLayout title={"Авторизация"}>
                <Form.Group
                    className="mb-3"
                    controlId="formUsername"
                >
                    <Form.Label>
                        Логин
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите логин"
                        value={authData.username}
                        onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formPassword"
                >
                    <Form.Label>
                        Пароль
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        value={authData.password}
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                    />
                </Form.Group>
                <p
                    className="text-danger"
                    style={{ minHeight: "24px" }}
                >
                    {label}
                </p>
                <Button onClick={buttonLoginHandler}>
                    Войти
                </Button>
            </PageLayout>
        </>
    );
};

export default Auth;