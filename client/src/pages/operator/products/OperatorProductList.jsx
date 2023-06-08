import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { ProductsService } from "../../../API/ProductsService";
import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";

const OperatorProductList = () => {
    const navigate = useNavigate();
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

    const [deleteProduct, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteRes = await ProductsService.deleteOne(id);

        const deletedProductId = products.findIndex((product) => product.id === id);
        const newProducts = [...products];
        newProducts.splice(deletedProductId, 1);

        setProducts(newProducts);
    });

    const buttonDeleteHandler = (id) => {
        deleteProduct(id);
    }

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
                            <Button onClick={() => navigate("/products/add")}>
                                Добавить продукт
                            </Button>
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
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(product.id)}
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

export default OperatorProductList;