import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { ProductsService } from "../../../API/ProductsService";
import { convertDateFromISO } from "../../../utils/convertDate";

const OperatorExpiredProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const [fetchProducts, isFetchingLoading, fetchError] = useFetching(async () => {
        const getProductsRes = await ProductsService.getAll(false, true);

        setProducts(getProductsRes.data.data.rows);
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <PageLayout title={"Список продуктов с истекающим сроком годности (меньше суток)"}>
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
                                        <th>Штрих-код</th>
                                        <th>Название продукта</th>
                                        <th>Актуальная цена</th>
                                        <th>Количество</th>
                                        <th>Дата окончания срока годности</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map((product) =>
                                            <tr key={product.id}>
                                                <td>
                                                    {
                                                        product.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.product_name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.actual_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.count
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        convertDateFromISO(product.expire_date)
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

export default OperatorExpiredProducts;