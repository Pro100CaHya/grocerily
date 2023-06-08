import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { SuppliersService } from "../../../API/SuppliersService.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";

const OperatorSuppliersInfo = () => {
    const params = useParams();

    const [supplier, setSupplier] = useState({
        name: "",
        address: "",
        telephone: ""
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

        updateSupplier();
    }

    const [fetchSupplier, isFetchingLoading, fetchError] = useFetching(async () => {
        const supplierData = await SuppliersService.getOne(params.id);

        setSupplier(supplierData.data.data.rows[0]);
    });

    const [updateSupplier, isUpdatingLoading, updateError] = useFetching(async () => {
        const updateData = await SuppliersService.updateOne(params.id, supplier);
    });

    useEffect(() => {
        fetchSupplier();
    }, []);

    return (
        <PageLayout title={"Информация о поставщике"}>
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

export default OperatorSuppliersInfo;