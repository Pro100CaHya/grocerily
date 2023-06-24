import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { ProductsService } from "../../../API/ProductsService";
import { useFetching } from "../../../hooks/useFetching";

const CustomerProductsList = () => {
    const [products, setProducts] = useState([]);

    const [fetchProducts, isFetchingLoading, fetchError] = useFetching(async () => {
        const getProducts = await ProductsService.getAll(true);

        const updProducts = getProducts.data.data.rows.map((product) => {
            const updProduct = {
                ...product,
            }

            if (product.is_perishable === true) {
                updProduct["type"] = "Скоропортящийся товар"
            } else {
                updProduct["type"] = "Обычный товар"
            }

            delete updProduct["is_perishable"];

            return updProduct;
        });

        setProducts(updProducts);
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <PageLayout title={"Список продуктов"}>
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
                                        <th>Базовая цена</th>
                                        <th>Единица измерения</th>
                                        <th>Вес (кг)</th>
                                        <th>Тип товара</th>
                                        <th>Категория</th>
                                        <th>Поставщик</th>
                                        <th></th>
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
                                                        product.name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.base_price
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.unit
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.weight
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.type
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.category_name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        product.supplier_name
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/products/${product.id}`}>Подробнее</Link>
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

export default CustomerProductsList;