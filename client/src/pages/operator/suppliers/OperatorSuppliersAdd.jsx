import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { SuppliersService } from "../../../API/SuppliersService.js";
import PageLayout from "../../../components/ui/PageLayout.jsx";

const OperatorSuppliersAdd = () => {
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState({
        name: "Тимур из Кухни поставщик",
        address: "Найдёшь меня везде, шеф-брат",
        telephone: "+7 (498) 890-12-34"
    });

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addSupplier(supplier);
    }

    const [addSupplier, isAddLoading, addError] = useFetching(async (supplier) => {
        const addData = await SuppliersService.addOne(supplier);

        setEdit(true);
    });

    return (
        <PageLayout title={"Добавить поставщика"}>
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
                            controlId="formSupplierName"
                        >
                            <Form.Label>
                                Название поставщика
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Название поставщика"
                                value={supplier.name}
                                disabled={!edit}
                                onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formSupplierAddress"
                        >
                            <Form.Label>
                                Базовая цена
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Адрес"
                                value={supplier.address}
                                disabled={!edit}
                                onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formUnit"
                        >
                            <Form.Label>
                                Номер телефона
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Номер телефона"
                                value={supplier.telephone}
                                disabled={!edit}
                                onChange={(e) => setSupplier({ ...supplier, telephone: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/products")}
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

export default OperatorSuppliersAdd;