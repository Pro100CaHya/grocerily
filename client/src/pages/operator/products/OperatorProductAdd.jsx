import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CategoriesService } from "../../../API/CategoriesService";
import { SuppliersService } from "../../../API/SuppliersService";
import { ProductsService } from "../../../API/ProductsService";
import PageLayout from "../../../components/ui/PageLayout";

const OperatorProductAdd = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "Багет французский",
        base_price: "80",
        unit: "шт",
        weight: "0.150",
        is_perishable: true,
        category: 2,
        supplier: 2
    });

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addProduct(product);
    }

    const [fetchProduct, isFetchingLoading, fetchError] = useFetching(async () => {
        const categoriesData = await CategoriesService.getAll();
        const suppliersData = await SuppliersService.getAll();

        setCategories(categoriesData.data.data.rows);
        setSuppliers(suppliersData.data.data.rows);
    });

    const [addProduct, isAddLoading, addError] = useFetching(async (product) => {
        const addData = await ProductsService.addOne(product);
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <PageLayout title={"Добавить продукт"}>
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
                            isAddLoading === true
                                ?
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border mx-auto" role="status">
                                    </div>
                                </div>
                                :
                                <div className="mt-3" style={{minHeight: "32px"}}></div>
                        }
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
                            <Form.Select
                                value={product.is_perishable}
                                disabled={!edit}
                                onChange={(e) => setProduct({ ...product, is_perishable: e.target.value })}
                            >
                                <option disabled value=""></option>
                                <option value="false">Обычный товар</option>
                                <option value="true">Скоропортящийся товар</option>
                            </Form.Select>
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
                        <Button
                            className="mt-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/products")}
                        >
                            Назад
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            disabled={!edit}
                            variant="success"
                            onClick={buttonAddHandler}
                        >
                            Добавить
                        </Button>
                    </>
            }
        </PageLayout>
    );
};

export default OperatorProductAdd;