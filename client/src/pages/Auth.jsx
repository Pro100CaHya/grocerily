import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { UserService } from "../API/UsersService";
import { UserContext } from "../context/UserContext";

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
            authResponse = await UserService.authorization(authData);
        } catch (error) {
            setLabel("Неверный логин/пароль");

            return;
        }

        localStorage.setItem("username", authResponse.data.data.rows[0].username);
        localStorage.setItem("id", authResponse.data.data.rows[0].id);
        localStorage.setItem("role", authResponse.data.data.rows[0].role);

        setUser({
            username: authResponse.data.data.rows[0].username,
            id: authResponse.data.data.rows[0].id,
            role: authResponse.data.data.rows[0].role
        });
    }

    return (
        <>
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
                style={{minHeight: "24px"}}
            >
                {label}
            </p>
            <Button onClick={buttonLoginHandler}>
                Войти
            </Button>
        </>
    );
};

export default Auth;