import React, { useState, useEffect, useContext } from "react";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { OrdersService } from "../../../API/OrdersService";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const CustomerOrdersList = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    const [fetchOrders, isFetchingLoading, fetchError] = useFetching(async () => {
        const getOrders = await OrdersService.getByCustomer(user.id);

        setOrders(getOrders.data.data.rows);
    });

    const [deleteOrder, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteOrderRes = await OrdersService.deleteOne(id);

        const deletedOrderId = orders.findIndex((category) => category.id === id);
        const newOrders = [...orders];
        newOrders.splice(deletedOrderId, 1);

        setOrders(newOrders);
    })

    useEffect(() => {
        fetchOrders();
    }, []);

    const buttonDeleteHandler = async (id) => {
        await deleteOrder(id);
    }

    return (
        <>
            <PageLayout title={"Мои заказы"}>
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
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>Номер заказа</th>
                                        <th>Сумма</th>
                                        <th>Статус</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order) =>
                                            <tr key={order.id}>
                                                <td>
                                                    {
                                                        order.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.sum
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.status === "confirmed"
                                                            ? "Подтверждён"
                                                            : order.status === "done"
                                                                ? "Выполнен"
                                                                : ""
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/orders/${order.id}`}>Подробнее</Link>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(order.id)}
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

export default CustomerOrdersList;