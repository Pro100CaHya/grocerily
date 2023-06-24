import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { RemnantsService } from "../../../API/RemnantsService.js";
import { ProductsService } from "../../../API/ProductsService.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";

import { convertDateToISO } from "../../../utils/convertDate.js";

const OperatorRemnantsAdd = () => {
    const navigate = useNavigate();

    const [remnant, setRemnant] = useState({
        product: 2,
        actual_price: 50,
        count: 40,
        delivery_date: "11 Июнь 2023 09:00:00",
        expire_date: "21 Июнь 2023 09:00:00",
    });
    const [products, setProducts] = useState([]);

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addRemnant(remnant);
    }

    const [fetchProducts, isFetchingLoading, isFetchError] = useFetching(async () => {
        const productsData = await ProductsService.getAll();

        setProducts(productsData.data.data.rows);
    });

    const [addRemnant, isAddLoading, addError] = useFetching(async () => {
        const addedRemnant = {
            ...remnant,
            delivery_date: convertDateToISO(remnant.delivery_date),
            expire_date: convertDateToISO(remnant.expire_date)
        }

        const addData = await RemnantsService.addOne(addedRemnant);

        console.log(addData)

        setEdit(true);
    });

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <PageLayout title={"Добавить информацию об остатках"}>
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
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/remnants")}
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

export default OperatorRemnantsAdd;