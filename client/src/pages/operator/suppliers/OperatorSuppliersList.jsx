import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { SuppliersService } from "../../../API/SuppliersService";

const OperatorSuppliersList = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    const [fetchSuppliers, isFetchingLoading, fetchError] = useFetching(async () => {
        const getSuppliers = await SuppliersService.getAll();

        setSuppliers(getSuppliers.data.data.rows);
    });

    const [deleteSupplier, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteRes = await SuppliersService.deleteOne(id);

        const deletedSupplierId = suppliers.findIndex((supplier) => supplier.id === id);
        const newSuppliers = [...suppliers];
        newSuppliers.splice(deletedSupplierId, 1);

        setSuppliers(newSuppliers);
    });

    const buttonDeleteHandler = (id) => {
        deleteSupplier(id);
    }

    useEffect(() => {
        fetchSuppliers();
    }, []);

    return (
        <>
            <PageLayout title={"Список поставщиков"}>
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
                            <Button onClick={() => navigate("/suppliers/add")}>
                                Добавить поставщика
                            </Button>
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th>Номер телефона</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        suppliers.map((supplier) =>
                                            <tr key={supplier.id}>
                                                <td>
                                                    {
                                                        supplier.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        supplier.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        supplier.telephone
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/suppliers/${supplier.id}`}>Подробнее</Link>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(supplier.id)}
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

export default OperatorSuppliersList;