import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { CustomersService } from "../../../API/CustomersService";
import { UserService } from "../../../API/UsersService";

const OperatorCustomersList = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    const [fetchClients, isFetchingLoading, fetchError] = useFetching(async () => {
        const getClients = await CustomersService.getAll();

        setClients(getClients.data.data.rows);
    });

    const [deleteClient, isDeleteLoading, deleteError] = useFetching(async (selectedClient) => {
        const deleteRes = await CustomersService.deleteOne(selectedClient.id);

        console.log(selectedClient.user);

        const deleteUser = await UserService.deleteOne(selectedClient.user);

        const deletedClientId = clients.findIndex((client) => client.id === selectedClient.id);
        const newClients = [...clients];
        newClients.splice(deletedClientId, 1);

        setClients(newClients);
    });

    const buttonDeleteHandler = (client) => {
        deleteClient(client);
    }

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <>
            <PageLayout title={"Список клиентов"}>
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
                            <Button onClick={() => navigate("/customers/add")}>
                                Добавить клиента
                            </Button>
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Фамилия</th>
                                        <th>Имя</th>
                                        <th>Отчество</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        clients.map((client) =>
                                            <tr key={client.id}>
                                                <td>
                                                    {
                                                        client.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        client.surname
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        client.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        client.patronym
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/customers/${client.id}`}>Подробнее</Link>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(client)}
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

export default OperatorCustomersList;