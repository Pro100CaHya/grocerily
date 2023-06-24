import React, { useState, useEffect } from "react";

import { Button, Form } from "react-bootstrap";

import PageLayout from "../components/ui/PageLayout";
import { RemnantsService } from "../API/RemnantsService";
import { useFetching } from "../hooks/useFetching";

const GetHoursTillExpiration = () => {
    const [remnants, setRemnants] = useState([]);
    const [selectedRemnant, setSelectedRemnant] = useState("");
    const [checkResult, setCheckResult] = useState("");

    const [fetchRemnants, isFetchingLoading, fetchError] = useFetching(async () => {
        const remnantsRes = await RemnantsService.getAll();

        setRemnants(remnantsRes.data.data.rows);
    });

    const [checkRemnant, isCheckLoading, checkError] = useFetching(async () => {
        const checkRes = await RemnantsService.getOne(selectedRemnant, false, true);

        setCheckResult(checkRes.data.data.rows[0].get_hours_till_expiration);
    });

    const buttonCheckHandler = async (e) => {
        e.preventDefault();

        await checkRemnant();
    }

    useEffect(() => {
        fetchRemnants();
    }, [])

    return (
        <>
            <PageLayout title={"Узнать количество часов до окончания срока реализации товара"}>
                <Form.Group
                    className="mb-3"
                    controlId="formCategory"
                >
                    {
                        isCheckLoading === true
                        ?
                        <div className="d-flex justify-content-center mt-3">
                            <div className="spinner-border mx-auto" role="status">
                            </div>
                        </div>
                        :
                        <div className="mt-3 text-center" style={{minHeight: "32px"}}>
                            {isNaN(parseInt(checkResult))
                                ? checkResult
                                : `До окончания срока реализации осталось: ${checkResult} часов`}
                        </div>
                    }
                    <Form.Label>
                        Товар
                    </Form.Label>
                    <Form.Select
                        value={selectedRemnant}
                        onChange={(e) => setSelectedRemnant(e.target.value)}
                    >
                        <option disabled value=""></option>
                        {
                            remnants.map((remnant) =>
                                <option
                                    key={remnant.id}
                                    value={remnant.id}
                                >
                                    {
                                        "(Артикул: " +
                                        remnant.id +
                                        ") " +
                                        remnant.product_name
                                    }
                                </option>
                            )
                        }
                    </Form.Select>
                    <Button
                        className="mt-3"
                        onClick={buttonCheckHandler}
                    >
                        Проверить
                    </Button>
                </Form.Group>
            </PageLayout>
        </>
    );
};

export default GetHoursTillExpiration;