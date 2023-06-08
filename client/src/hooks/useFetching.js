import { useState } from "react"
import { delay } from "../utils/delay";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setIsError] = useState(false);

    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await delay(1000);
            await callback(...args);
        } catch (error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}