import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { RemnantsService } from "../../../API/RemnantsService";
import { convertDateFromISO } from "../../../utils/convertDate";
import { OrdersService } from "../../../API/OrdersService";


const OperatorOrdersList = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const [fetchOrders, isFetchingLoading, fetchError] = useFetching(async () => {
        const getOrders = await OrdersService.getAll();

        setOrders(getOrders.data.data.rows);
    });

    const [deleteOrder, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteRes = await OrdersService.deleteOne(id);

        const deletedOrderId = orders.findIndex((order) => order.id === id);
        const newOrders = [...orders];
        newOrders.splice(deletedOrderId, 1);

        setOrders(newOrders);
    });

    const buttonDeleteHandler = (id) => {
        deleteOrder(id);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <PageLayout title={"Список заказов"}>
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
                                        <th>Клиент</th>
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
                                                        order.status === "pre-order"
                                                            ? "Предзаказ"
                                                            : order.status === "confirmed"
                                                                ? "Подтверждён"
                                                                : "Выполнен"
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        order.customer
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

export default OperatorOrdersList;