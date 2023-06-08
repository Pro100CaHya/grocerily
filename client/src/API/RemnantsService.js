import axios from "axios";

export class RemnantsService {
    static async getByProduct(product) {
        return axios.get(`http://localhost:8000/api/remnants`, {
            params: {
                product
            }
        });
    }
}