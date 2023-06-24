import React, { useEffect, useState } from "react";
import PageLayout from "../components/ui/PageLayout";
import { useFetching } from "../hooks/useFetching";

import { Table, Form } from "react-bootstrap";
import { SuppliersService } from "../API/SuppliersService";

const GetSuppliersThatHaveProducts = () => {
    const [suppliers, setSuppliers] = useState([]);

    const [fetchSuppliers, isFetchingLoading, fetchError] = useFetching(async () => {
        const fetchSuppliersRes = await SuppliersService.getSuppliersThatHaveGoods(true);

        console.log(fetchSuppliersRes)

        setSuppliers(fetchSuppliersRes.data.data.rows);
    });

    useEffect(() => {
        fetchSuppliers();
    }, []);

    return (
        <PageLayout title={"Поставщики, чьи товары есть в наличии"}>
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
                                    <th>Адрес</th>
                                    <th>Телефон</th>
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
                                                    supplier.address
                                                }
                                            </td>
                                            <td>
                                                {
                                                    supplier.telephone
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
    );
};

export default GetSuppliersThatHaveProducts;