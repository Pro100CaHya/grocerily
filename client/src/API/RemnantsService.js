import axios from "axios";

export class RemnantsService {
    static async getByProduct(product) {
        return axios.get(`http://localhost:8000/api/remnants`, {
            params: {
                product
            }
        });
    }

    static async getAll() {
        return axios.get(`http://localhost:8000/api/remnants`);
    }

    static async getOne(id, checkForExpire = false, getHoursTillExpiration = false) {
        return axios.get(`http://localhost:8000/api/remnants/${id}`, {
            params: {
                checkForExpire,
                getHoursTillExpiration
            }
        });
    }

    static async updateOne(id, remnant) {
        return axios.put(`http://localhost:8000/api/remnants/${id}`, remnant);
    }

    static async addOne(remnant) {
        return axios.post(`http://localhost:8000/api/remnants`, remnant);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/remnants/${id}`);
    }

    static async updatePrices(updatePrices) {
        return axios.get(`http://localhost:8000/api/remnants`, {
            params: {
                updatePrices
            }
        });
    }
}