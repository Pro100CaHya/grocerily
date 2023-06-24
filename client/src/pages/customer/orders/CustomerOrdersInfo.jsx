import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { OrdersService } from "../../../API/OrdersService.js";
import PageLayout from "../../../components/ui/PageLayout";
import { OrderDetailsService } from "../../../API/OrderDetailsService.js";
import { RemnantsService } from "../../../API/RemnantsService.js";
import { convertDateFromISO } from "../../../utils/convertDate.js";

const CustomerOrdersInfo = () => {
    const params = useParams();

    const [orderDetails, setOrderDetails] = useState([]);
    const [remnants, setRemnants] = useState([]);

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

        updateOrderDetails();

        setEdit(true);
    }

    const updateOrder = (id, selectedRemnantId) => {
        const updatedOrderDetailId = orderDetails.findIndex((orderDetail) => orderDetail.id === id);
        const updatedOrderDetail = orderDetails.find((orderDetail) => orderDetail.id === id);

        const selectedRemnant = remnants.find((remnant) => remnant.id == selectedRemnantId);

        const updatedOrderDetails = [ ...orderDetails ];

        updatedOrderDetails.splice(updatedOrderDetailId, 1, { ...updatedOrderDetail, product: selectedRemnant.product_id, remnant: selectedRemnant.id });
        setOrderDetails(updatedOrderDetails);
    };

    const updateOrderCount = (id, count) => {
        const updatedOrderDetailId = orderDetails.findIndex((orderDetail) => orderDetail.id === id);
        const updatedOrderDetail = orderDetails.find((orderDetail) => orderDetail.id === id);

        const updatedOrderDetails = [ ...orderDetails ];

        updatedOrderDetails.splice(updatedOrderDetailId, 1, { ...updatedOrderDetail, count });
        setOrderDetails(updatedOrderDetails);
    }

    const [fetchOrderDetails, isFetchingLoading, fetchError] = useFetching(async () => {
        const orderDetailsRes = await OrderDetailsService.getByOrder(params.id);
        const remnantsRes = await RemnantsService.getAll();

        setOrderDetails(orderDetailsRes.data.data.rows);
        setRemnants(remnantsRes.data.data.rows);
    });

    const [updateOrderDetails, isUpdatingLoading, updateError] = useFetching(async () => {
        for (let i = 0; i < orderDetails.length; i++) {
            const updatedOrderDetails = await OrderDetailsService.updateOne(orderDetails[i].id, orderDetails[i]);
        }
    });

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <PageLayout title={"Детали заказа"}>
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
                        {
                            orderDetails.map((orderDetail) =>
                                <div key={orderDetail.id}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formRemnant"
                                    >
                                        <Form.Label>
                                            Товар
                                        </Form.Label>
                                        <Form.Select
                                            value={orderDetail.remnant}
                                            disabled={!edit}
                                            onChange={(e) => updateOrder(orderDetail.id, e.target.value)}
                                        >
                                            <option disabled value=""></option>
                                            {
                                                remnants.map((remnant) =>
                                                    <option
                                                        key={remnant.id}
                                                        value={remnant.id}
                                                    >
                                                        {
                                                            remnant.product_name +
                                                            " (осталось: " +
                                                            remnant.count +
                                                            ", цена: " +
                                                            remnant.actual_price +
                                                            ", " +
                                                            convertDateFromISO(remnant.delivery_date) +
                                                            " - " +
                                                            convertDateFromISO(remnant.expire_date) +
                                                            ")"
                                                        }
                                                    </option>
                                                )
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group
                                        className="mt-3 mb-3"
                                        controlId="formCategoryName"
                                    >
                                        <Form.Label>
                                            Количество
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Количество"
                                            value={orderDetail.count}
                                            disabled={!edit}
                                            onChange={(e) => updateOrderCount(orderDetail.id, e.target.value)}
                                        />
                                    </Form.Group>
                                </div>
                            )
                        }
                    </>
            }
        </PageLayout>
    )
};

export default CustomerOrdersInfo;