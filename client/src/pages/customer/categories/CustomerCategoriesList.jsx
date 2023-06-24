import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Table from 'react-bootstrap/Table';

import PageLayout from "../../../components/ui/PageLayout";

import { useFetching } from "../../../hooks/useFetching";
import { Button } from "react-bootstrap";
import { CategoriesService } from "../../../API/CategoriesService";

const CustomerCategoriesList = () => {
    const [categories, setCategories] = useState([]);

    const [fetchSuppliers, isFetchingLoading, fetchError] = useFetching(async () => {
        const getSuppliers = await CategoriesService.getAll();

        setCategories(getSuppliers.data.data.rows);
    });

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
                            <Table striped bordered hover
                                className="mt-3"
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
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

export default CustomerCategoriesList;