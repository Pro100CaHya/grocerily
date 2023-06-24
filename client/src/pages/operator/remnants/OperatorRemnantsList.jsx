import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { RemnantsService } from "../../../API/RemnantsService";
import { convertDateFromISO } from "../../../utils/convertDate";

const OperatorRemnantsList = () => {
    const navigate = useNavigate();
    const [remnants, setRemnants] = useState([]);

    const [fetchRemnants, isFetchingLoading, fetchError] = useFetching(async () => {
        const getRemnants = await RemnantsService.getAll();

        setRemnants(getRemnants.data.data.rows);
    });

    const [deleteRemnant, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteRes = await RemnantsService.deleteOne(id);

        const deletedRemnantId = remnants.findIndex((supplier) => supplier.id === id);
        const newRemnants = [...remnants];
        newRemnants.splice(deletedRemnantId, 1);

        setRemnants(newRemnants);
    });

    const [updatePrices, isUpdateLoading, updateError] = useFetching(async () => {
        const updatePricesRes = await RemnantsService.updatePrices(true);
    });

    const buttonDeleteHandler = (id) => {
        deleteRemnant(id);
    }

    const buttonUpdatePricesHandler = async () => {
        await updatePrices();
        await fetchRemnants();
    }

    useEffect(() => {
        fetchRemnants();
    }, []);

    return (
        <>
            <PageLayout title={"Список остатков товаров"}>
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
                            <Button onClick={() => navigate("/remnants/add")}>
                                Добавить остатки товара
                            </Button>
                            <Button
                                onClick={buttonUpdatePricesHandler}
                                variant={"secondary"}
                                className="ms-3"
                            >
                                Обновить цены
                            </Button>
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название продукта</th>
                                        <th>Актуальная цена (руб.)</th>
                                        <th>Дата поставки</th>
                                        <th>Дата окончания срока годности</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        remnants.map((remnant) =>
                                            <tr key={remnant.id}>
                                                <td>
                                                    {
                                                        remnant.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        remnant.product_name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        remnant.actual_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        convertDateFromISO(remnant.delivery_date)
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        convertDateFromISO(remnant.expire_date)
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/remnants/${remnant.id}`}>Подробнее</Link>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(remnant.id)}
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

export default OperatorRemnantsList;