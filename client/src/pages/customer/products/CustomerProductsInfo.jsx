import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Table } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CategoriesService } from "../../../API/CategoriesService";
import { SuppliersService } from "../../../API/SuppliersService";
import { ProductsService } from "../../../API/ProductsService";
import { RemnantsService } from "../../../API/RemnantsService.js";
import PageLayout from "../../../components/ui/PageLayout";

import { convertDateFromISO } from "../../../utils/convertDate.js";

const CustomerProductsInfo = () => {
    const params = useParams();

    const [product, setProduct] = useState({
        name: "",
        base_price: "",
        unit: "",
        weight: "",
        is_perishable: "",
        category: "",
        supplier: ""
    });

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [remnants, setRemnants] = useState([]);

    const [edit, setEdit] = useState(false);

    const [fetchProduct, isFetchingLoading, fetchError] = useFetching(async () => {
        const productData = await ProductsService.getOne(params.id);
        const remnantData = await RemnantsService.getByProduct(params.id);
        const categoriesData = await CategoriesService.getAll();
        const suppliersData = await SuppliersService.getAll();

        console.log(remnantData)

        setCategories(categoriesData.data.data.rows);
        setSuppliers(suppliersData.data.data.rows);
        setProduct(productData.data.data.rows[0]);
        setRemnants(remnantData.data.data.rows);
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <PageLayout title={"Информация о продукте"}>
            {
                isFetchingLoading === true
                    ?
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border mx-auto" role="status">
                        </div>
                    </div>
                    :
                    <>
                        <Form.Group
                            className="mt-3 mb-3"
                            controlId="formProductName"
                        >
                            <Form.Label>
                                Название продукта
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Название продукта"
                                value={product.name}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasePrice"
                        >
                            <Form.Label>
                                Базовая цена
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Базовая цена"
                                value={product.base_price}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, base_price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formUnit"
                        >
                            <Form.Label>
                                Единица измерения
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Единица измерения"
                                value={product.unit}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, unit: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formWeight"
                        >
                            <Form.Label>
                                Вес (в кг)
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Вес (в кг)"
                                value={product.weight}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formType"
                        >
                            <Form.Label>
                                Тип товара
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Тип товара"
                                value={product.is_perishable === true ? `Скоропортящийся товар` : `Обычный`}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, is_perishable: e.target.value })}
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCategory"
                        >
                            <Form.Label>
                                Категория
                            </Form.Label>
                            <Form.Select
                                value={product.category}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                <option disabled value=""></option>
                                {
                                    categories.map((category) =>
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formCategory"
                        >
                            <Form.Label>
                                Поставщик
                            </Form.Label>
                            <Form.Select
                                value={product.supplier}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, supplier: e.target.value })}
                            >
                                <option disabled value=""></option>
                                {
                                    suppliers.map((supplier) =>
                                        <option
                                            key={supplier.id}
                                            value={supplier.id}
                                        >
                                            {supplier.name}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                        <h2 className="mt-5 text-center">
                            Информация о партиях продукта
                        </h2>
                        <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>Номер партии</th>
                                        <th>Количество</th>
                                        <th>Актуальная цена (руб.)</th>
                                        <th>Дата поставки</th>
                                        <th>Дата окончания срока годности</th>
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
                                                        remnant.count
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

export default CustomerProductsInfo;