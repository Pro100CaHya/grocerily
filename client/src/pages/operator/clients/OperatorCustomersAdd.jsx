import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CustomersService } from "../../../API/CustomersService.js";
import PageLayout from "../../../components/ui/PageLayout.jsx";
import { UserService } from "../../../API/UsersService.js";

const OperatorCustomersAdd = () => {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        surname: "Иванов",
        name: "Иван",
        patronym: "Иванович",
        telephone: "8-800-555-35-35",
    });

    const [user, setUser] = useState({
        username: "ivanov",
        password: "ivanov",
        role: "customer"
    })

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addCustomer(customer, user);
    }

    const [addCustomer, isAddLoading, addError] = useFetching(async (customer, user) => {
        const addedUser = await UserService.registration(user);
        const addData = await CustomersService.addOne({ ...customer, "user": addedUser.data.data.rows[0].id });

        setEdit(true);
    });

    return (
        <PageLayout title={"Добавить клиента"}>
            {
                    <>
                        {
                            isAddLoading === true
                                ?
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border mx-auto" role="status">
                                    </div>
                                </div>
                                :
                                <div className="mt-3" style={{minHeight: "32px"}}></div>
                        }
                        <Form.Group
                            className="mt-3 mb-3"
                            controlId="formCustomerSurname"
                        >
                            <Form.Label>
                                Фамилия
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Фамилия"
                                value={customer.surname}
                                disabled={!edit}
                                onChange={(e) => setCustomer({ ...customer, surname: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerName"
                        >
                            <Form.Label>
                                Имя
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Имя"
                                value={customer.name}
                                disabled={!edit}
                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerPatronym"
                        >
                            <Form.Label>
                                Отчество
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Отчество"
                                value={customer.patronym}
                                disabled={!edit}
                                onChange={(e) => setCustomer({ ...customer, patronym: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerTelephone"
                        >
                            <Form.Label>
                                Номер телефона
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Номер телефона"
                                value={customer.telephone}
                                disabled={!edit}
                                onChange={(e) => setCustomer({ ...customer, telephone: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerUsername"
                        >
                            <Form.Label>
                                Логин пользователя
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Логин пользователя"
                                value={user.username}
                                disabled={!edit}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerPassword"
                        >
                            <Form.Label>
                                Пароль пользователя
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль пользователя"
                                value={user.username}
                                disabled={!edit}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/customers")}
                        >
                            Назад
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            disabled={!edit}
                            variant="success"
                            onClick={buttonAddHandler}
                        >
                            Добавить
                        </Button>
                    </>
            }
        </PageLayout>
    );
};

export default OperatorCustomersAdd;