import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { RemnantsService } from "../../../API/RemnantsService";

import { Button, Form } from "react-bootstrap";
import PageLayout from "../../../components/ui/PageLayout";
import { useFetching } from "../../../hooks/useFetching";
import { convertDateFromISO } from "../../../utils/convertDate";
import { OrdersService } from "../../../API/OrdersService";
import { OrderDetailsService } from "../../../API/OrderDetailsService";
import { ProductsService } from "../../../API/ProductsService";

const RegularPreOrderAdd = () => {
    const { user, setUser } = useContext(UserContext);

    const [order, setOrder] = useState({
        customer: user.id,
        orderDetails: [
            {
                id: 0,
                product: "",
                count: "",
                remnant_id: "",
                price: ""
            }
        ]
    });

    const [products, setProducts] = useState([]);

    const [edit, setEdit] = useState(true);

    const updateOrder = (id, selectedRemnantId) => {
        const updatedOrderDetailId = order.orderDetails.findIndex((orderDetail) => orderDetail.id === id);
        const updatedOrderDetail = order.orderDetails.find((orderDetail) => orderDetail.id === id);

        const selectedRemnant = products.find((remnant) => remnant.id == selectedRemnantId);

        const updatedOrder = { ...order };

        updatedOrder.orderDetails.splice(updatedOrderDetailId, 1, { ...updatedOrderDetail, product: selectedRemnant.id, remnant_id: null });
        setOrder(updatedOrder);
    }

    const updateOrderCount = (id, count) => {
        const updatedOrderDetailId = order.orderDetails.findIndex((orderDetail) => orderDetail.id === id);
        const updatedOrderDetail = order.orderDetails.find((orderDetail) => orderDetail.id === id);

        const updatedOrder = { ...order };

        updatedOrder.orderDetails.splice(updatedOrderDetailId, 1, { ...updatedOrderDetail, count });
        setOrder(updatedOrder);
    }

    const addOrderDetailHandler = () => {
        const updatedOrder = { ...order };
        updatedOrder.orderDetails.push({
            id: updatedOrder.orderDetails.length,
            product: "",
            count: "",
            remnant_id: ""
        });

        setOrder(updatedOrder);
    }

    const addOrderHandler = async () => {
        setEdit(false);

        await addOrder(order);

        setEdit(true);
    }

    const [fetchProduct, isFetchingLoading, fetchError] = useFetching(async () => {
        const productsData = await ProductsService.getAll();

        setProducts(productsData.data.data.rows);
    });

    const [addOrder, isAddLoading, addError] = useFetching(async (order) => {
        const sum = order.orderDetails.reduce((sm, orderDetail) => {
            console.log(orderDetail)
            const selectedRemnant = products.find((remnant) => remnant.id == orderDetail.product);

            return sm + orderDetail.count * selectedRemnant.base_price;
        }, 0);

        console.log(sum);

        const addOrderRes = await OrdersService.addOne({
            status: "pre-order",
            customer: order.customer,
            sum
        });

        for (let i = 0; i < order.orderDetails.length; i++) {
            const addOrderDetailRes = await OrderDetailsService.addOne({
                count: order.orderDetails[i].count,
                product: order.orderDetails[i].product,
                order: addOrderRes.data.data.rows[0].id,
                remnant: null
            });
        }
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <PageLayout title={"Добавить предзаказ"}>
            {
                isFetchingLoading === true
                    ?
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border mx-auto" role="status">
                        </div>
                    </div>
                    :
                    <>
                        <Button className="mt-5" onClick={addOrderDetailHandler}>
                            Добавить позицию
                        </Button>
                        <Button className="mt-5 ms-3" onClick={addOrderHandler}>
                            Создать заказ
                        </Button>
                        {
                            isAddLoading === true
                                ?
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border mx-auto" role="status">
                                    </div>
                                </div>
                                :
                                <div className="mt-3" style={{ minHeight: "32px" }}></div>
                        }
                        {
                            order.orderDetails.map((orderDetail) =>
                                <div key={orderDetail.id}>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="formRemnant"
                                    >
                                        <Form.Label>
                                            Товар
                                        </Form.Label>
                                        <Form.Select
                                            value={orderDetail.product}
                                            disabled={!edit}
                                            onChange={(e) => updateOrder(orderDetail.id, e.target.value)}
                                        >
                                            <option disabled value=""></option>
                                            {
                                                products.map((product) =>
                                                    <option
                                                        key={product.id}
                                                        value={product.id}
                                                    >
                                                        {
                                                            "(Артикул: " +
                                                            product.id +
                                                            ") " +
                                                            product.name
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
    );
};

export default RegularPreOrderAdd;