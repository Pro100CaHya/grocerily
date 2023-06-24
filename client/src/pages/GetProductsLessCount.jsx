import React, { useEffect, useState } from "react";
import PageLayout from "../components/ui/PageLayout";
import { useFetching } from "../hooks/useFetching";

import { Table, Form } from "react-bootstrap";
import { ProductsService } from "../API/ProductsService";

const GetProductsLessCount = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    const [fetchProducts, isFetchingLoading, fetchError] = useFetching(async (count) => {
        const fetchProductsRes = await ProductsService.getProductsLessCount(count);

        setProducts(fetchProductsRes.data.data.rows);
    });

    useEffect(() => {
        if (count !== 0) {
            fetchProducts(count);
        }
    }, [count]);

    return (
        <PageLayout title={"Товары количество которых меньше установленного минимума"}>
            <Form.Group
                className="mt-3 mb-3"
                controlId="formCategoryName"
            >
                <Form.Label>
                    Установленный минимум
                </Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Установленный минимум"
                    value={count}
                    onChange={(e) => setCount(e.target.value === "" ? 0 : e.target.value)}
                />
            </Form.Group>
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
                                    <th>Название продукта</th>
                                    <th>Количество</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) =>
                                        <tr key={product.id}>
                                            <td>
                                                {
                                                    product.product_name
                                                }
                                            </td>
                                            <td>
                                                {
                                                    product.count
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

export default GetProductsLessCount;