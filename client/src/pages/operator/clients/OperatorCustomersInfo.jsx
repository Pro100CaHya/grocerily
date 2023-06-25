import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CustomersService } from "../../../API/CustomersService.js";
import { UsersService } from "../../../API/UsersService.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";

const OperatorCustomersInfo = () => {
    const params = useParams();

    const [customer, setCustomer] = useState({
        user: "",
        surname: "",
        name: "",
        patronym: "",
        telephone: ""
    });

    const [user, setUser] = useState({
        username: "",
        id: "",
        password: "",
        role: ""
    });

    const [edit, setEdit] = useState(false);

    const buttonEditHandler = (e) => {
        e.preventDefault();

        setEdit(true);
    }

    const buttonCancelHandler = (e) => {
        e.preventDefault();

        setEdit(false);
    }

    const buttonUpdateHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        updateCustomer();
    }

    const [fetchCustomer, isFetchingLoading, fetchError] = useFetching(async () => {
        const customerData = await CustomersService.getOne(params.id);
        const userData = await UsersService.getOne(customerData.data.data.rows[0].user);

        console.log(userData.data.data.rows[0])

        setCustomer(customerData.data.data.rows[0]);
        setUser(userData.data.data.rows[0])
    });

    const [updateCustomer, isUpdatingLoading, updateError] = useFetching(async () => {
        const updateData = await CustomersService.updateOne(params.id, customer);
        const userUpdate = await UsersService.updateOne(customer.user, {
            "username": user.username,
            "password": user.password,
            "role": user.role
        });
    });

    useEffect(() => {
        fetchCustomer();
    }, []);

    return (
        <PageLayout title={"Информация о клиенте"}>
            {
                isFetchingLoading === true
                    ?
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border mx-auto" role="status">
                        </div>
                    </div>
                    :
                    <>
                        {
                            isUpdatingLoading === true
                                ?
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border mx-auto" role="status">
                                    </div>
                                </div>
                                :
                                <div className="mt-3" style={{ minHeight: "32px" }}></div>
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
                            controlId="formType"
                        >
                            <Form.Label>
                                Тип пользователя
                            </Form.Label>
                            <Form.Select
                                value={user.role}
                                disabled={!edit}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                            >
                                <option value="customer">Обычный клиент</option>
                                <option value="regular customer">Постоянный клиент</option>
                            </Form.Select>
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="success"
                            onClick={buttonEditHandler}
                            disabled={edit}
                        >
                            Редактировать
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={buttonCancelHandler}
                        >
                            Отменить
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            disabled={!edit}
                            onClick={buttonUpdateHandler}
                        >
                            Cохранить изменения
                        </Button>
                    </>
            }
        </PageLayout>
    );
};

export default OperatorCustomersInfo;