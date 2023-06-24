import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { RemnantsService } from "../../../API/RemnantsService.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";
import { ProductsService } from "../../../API/ProductsService.js";

import { convertDateFromISO, convertDateToISO } from "../../../utils/convertDate.js";

const OperatorRemnantsInfo = () => {
    const params = useParams();

    const [products, setProducts] = useState([]);
    const [remnant, setRemnant] = useState({
        actual_price: "",
        delivery_date: "",
        expire_date: "",
        product: "",
        count: ""
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

        updateRemnant();
    }

    const [fetchRemnant, isFetchingLoading, fetchError] = useFetching(async () => {
        const remnantData = await RemnantsService.getOne(params.id);
        const productsData = await ProductsService.getAll();

        remnantData.data.data.rows[0].delivery_date = convertDateFromISO(remnantData.data.data.rows[0].delivery_date);
        remnantData.data.data.rows[0].expire_date = convertDateFromISO(remnantData.data.data.rows[0].expire_date);

        setProducts(productsData.data.data.rows);
        setRemnant(remnantData.data.data.rows[0]);
    });

    const [updateRemnant, isUpdatingLoading, updateError] = useFetching(async () => {
        const updatedRemnant = {
            ...remnant,
            delivery_date: convertDateToISO(remnant.delivery_date),
            expire_date: convertDateToISO(remnant.expire_date)
        }

        const updateData = await RemnantsService.updateOne(params.id, updatedRemnant);
    });

    useEffect(() => {
        fetchRemnant();
    }, []);

    return (
        <PageLayout title={"Информация об остатке товара"}>
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
                            controlId="formRemnantProduct"
                        >
                            <Form.Label>
                                Название продукта
                            </Form.Label>
                            <Form.Select
                                value={remnant.product}
                                disabled={!edit}
                                onChange={(e) => setRemnant({ ...remnant, product: e.target.value })}
                            >
                                <option disabled value=""></option>
                                {
                                    products.map((product) =>
                                        <option key={product.id} value={product.id}>{`${product.name} (Артикул: ${product.id})`}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formRemnantActualPrice"
                        >
                            <Form.Label>
                                Актуальная цена
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Актуальная цена"
                                value={remnant.actual_price}
                                disabled={!edit}
                                onChange={(e) => setRemnant({ ...remnant, actual_price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formRemnantCount"
                        >
                            <Form.Label>
                                Количество
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Количество"
                                value={remnant.count}
                                disabled={!edit}
                                onChange={(e) => setRemnant({ ...remnant, count: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formRemnantDeliveryDate"
                        >
                            <Form.Label>
                                Дата поставки
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Дата поставки"
                                value={remnant.delivery_date}
                                disabled={!edit}
                                onChange={(e) => setRemnant({ ...remnant, delivery_date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formRemnantExpireDate"
                        >
                            <Form.Label>
                                Дата окончания срока годности
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Дата окончания срока годности"
                                value={remnant.expire_date}
                                disabled={!edit}
                                onChange={(e) => setRemnant({ ...remnant, expire_date: e.target.value })}
                            />
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

export default OperatorRemnantsInfo;