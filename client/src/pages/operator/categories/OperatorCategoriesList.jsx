import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { CategoriesService } from "../../../API/CategoriesService";

const OperatorCategoriesList = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [fetchSuppliers, isFetchingLoading, fetchError] = useFetching(async () => {
        const getSuppliers = await CategoriesService.getAll();

        setCategories(getSuppliers.data.data.rows);
    });

    const [deleteCategory, isDeleteLoading, deleteError] = useFetching(async (id) => {
        const deleteRes = await CategoriesService.deleteOne(id);

        const deletedCategoryId = categories.findIndex((category) => category.id === id);
        const newCategories = [...categories];
        newCategories.splice(deletedCategoryId, 1);

        setCategories(newCategories);
    });

    const buttonDeleteHandler = (id) => {
        deleteCategory(id);
    }

    useEffect(() => {
        fetchSuppliers();
    }, []);

    return (
        <>
            <PageLayout title={"Список категорий"}>
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
                            <Button onClick={() => navigate("/categories/add")}>
                                Добавить категорию
                            </Button>
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map((category) =>
                                            <tr key={category.id}>
                                                <td>
                                                    {
                                                        category.id
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        category.name
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/categories/${category.id}`}>Подробнее</Link>
                                                </td>
                                                <td>
                                                    <span
                                                        className="text-danger text-decoration-underline"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={(e) => buttonDeleteHandler(category.id)}
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

export default OperatorCategoriesList;