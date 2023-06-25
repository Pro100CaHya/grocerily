import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { UsersService } from "../../../API/UsersService";

const AdminOperatorsList = () => {
    const navigate = useNavigate();
    const [operators, setOperators] = useState([]);

    const [fetchOperators, isFetchingLoading, fetchError] = useFetching(async () => {
        const getOperators = await UsersService.getOperators("operator");

        setOperators(getOperators.data.data.rows);
    });

    const [deleteOperator, isDeleteLoading, deleteError] = useFetching(async (selectedOperator) => {
        const deleteRes = await UsersService.deleteOne(selectedOperator.id);

        const deletedOperatorId = operators.findIndex((operator) => operator.id === selectedOperator.id);
        const newOperators = [...operators];
        newOperators.splice( deletedOperatorId, 1);

        setOperators(newOperators);
    });

    const buttonDeleteHandler = (client) => {
        deleteOperator(client);
    }

    useEffect(() => {
        fetchOperators();
    }, []);

    return (
        <>
            <PageLayout title={"Список операторов"}>
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
                                isDeleteLoading
                                    ?
                                    <div className="d-flex justify-content-center mt-3">
                                        <div className="spinner-border mx-auto" role="status">
                                        </div>
                                    </div>
                                    :
                                    deleteError
                                        ?
                                        <div className="mt-3 text-danger text-center" style={{ minHeight: "32px" }}>
                                            {
                                                deleteError
                                            }
                                        </div>
                                        :
                                        <div className="mt-3" style={{ minHeight: "32px" }}></div>
                            }
                            <Button onClick={() => navigate("/operators/add")}>
                                Добавить оператора
                            </Button>
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Никнейм</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        operators.map((operator) =>
                                            <tr key={operator.id}>
                                                <td>
                                                    {
                                                        operator.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        operator.username
                                                    }
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(operator)}
                                                    >
                                                        Удалить
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </>
                }
            </PageLayout>
        </>
    );
};

export default AdminOperatorsList;