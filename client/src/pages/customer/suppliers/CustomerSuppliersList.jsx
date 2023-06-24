import React, { useState, useEffect } from "react";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { SuppliersService } from "../../../API/SuppliersService";

const CustomerSuppliersList = () => {
    const [suppliers, setSuppliers] = useState([]);

    const [fetchSuppliers, isFetchingLoading, fetchError] = useFetching(async () => {
        const getSuppliers = await SuppliersService.getAll();

        setSuppliers(getSuppliers.data.data.rows);
    });

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
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th>Номер телефона</th>
                                        <th>Адрес</th>
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
                                                    {
                                                        supplier.address
                                                    }
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

export default CustomerSuppliersList;