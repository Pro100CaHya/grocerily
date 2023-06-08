import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CategoriesService } from "../../../API/CategoriesService.js";

import PageLayout from "../../../components/ui/PageLayout.jsx";

const OperatorCategoriesInfo = () => {
    const params = useParams();

    const [category, setCategory] = useState({
        name: ""
    });

    const [edit, setEdit] = useState(false);

    const buttonEditHandler = (e) => {
        e.preventDefault();

        setEdit(true);
    }

    const buttonCancelHandler = (e) => {
        e.preventDefault();

        setEdit(false);
    }

    const buttonUpdateHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        updateCategory();
    }

    const [fetchCategory, isFetchingLoading, fetchError] = useFetching(async () => {
        const categoryData = await CategoriesService.getOne(params.id);

        setCategory(categoryData.data.data.rows[0]);
    });

    const [updateCategory, isUpdatingLoading, updateError] = useFetching(async () => {
        const updateData = await CategoriesService.updateOne(params.id, category);
    });

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <PageLayout title={"Информация о категории"}>
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
                            isUpdatingLoading === true
                                ?
                                <div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-border mx-auto" role="status">
                                    </div>
                                </div>
                                :
                                <div className="mt-3" style={{ minHeight: "32px" }}></div>
                        }
                        <Form.Group
                            className="mt-3 mb-3"
                            controlId="formCategoryName"
                        >
                            <Form.Label>
                                Название категории
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Название категории"
                                value={category.name}
                                disabled={!edit}
                                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                            />
                        </Form.Group>
                        <Button
                            className="mt-3"
                            variant="success"
                            onClick={buttonEditHandler}
                            disabled={edit}
                        >
                            Редактировать
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            variant="danger"
                            disabled={!edit}
                            onClick={buttonCancelHandler}
                        >
                            Отменить
                        </Button>
                        <Button
                            className="mt-3 ms-3"
                            disabled={!edit}
                            onClick={buttonUpdateHandler}
                        >
                            Cохранить изменения
                        </Button>
                    </>
            }
        </PageLayout>
    );
};

export default OperatorCategoriesInfo;