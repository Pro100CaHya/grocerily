import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";
import { UsersService } from "../../../API/UsersService.js";

const AdminOperatorsAdd = () => {
    const navigate = useNavigate();

    const [operator, setOperator] = useState({
        username: "wolf123",
        password: "wolf123",
        role: "operator"
    });

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addOperator(operator);
    }

    const [addOperator, isAddLoading, addError] = useFetching(async (operator) => {
        const addedUser = await UsersService.registration(operator);

        setEdit(true);
    });

    return (
        <PageLayout title={"Добавить оператора"}>
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
                                Никнейм
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Никнейм"
                                value={operator.username}
                                disabled={!edit}
                                onChange={(e) => setOperator({ ...operator, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCustomerName"
                        >
                            <Form.Label>
                                Пароль
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                value={operator.password}
                                disabled={!edit}
                                onChange={(e) => setOperator({ ...operator, password: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/operators")}
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

export default AdminOperatorsAdd;