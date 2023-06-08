import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { useFetching } from "../../../hooks/useFetching.js";

import { CategoriesService } from "../../../API/CategoriesService.js";
import PageLayout from "../../../components/ui/PageLayout.jsx";

const OperatorCategoriesAdd = () => {
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: "Сладости",
    });

    const [edit, setEdit] = useState(true);

    const buttonAddHandler = (e) => {
        e.preventDefault();
        setEdit(false);

        addCategory(category);
    }

    const [addCategory, isAddLoading, addError] = useFetching(async (category) => {
        const addData = await CategoriesService.addOne(category);

        setEdit(true);
    });

    return (
        <PageLayout title={"Добавить категорию"}>
            {
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
                            variant="danger"
                            disabled={!edit}
                            onClick={(e) => navigate("/categories")}
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

export default OperatorCategoriesAdd;