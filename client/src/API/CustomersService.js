import axios from "axios";

export class CustomersService {
    static async getAll() {
        return axios.get(`http://localhost:8000/api/customers/`);
    }

    static async getOne(id) {
        return axios.get(`http://localhost:8000/api/customers/${id}`);
    }

    static async getByUserId(user) {
        return axios.get(`http://localhost:8000/api/customers/getByUserId`, {
            params: {
                user
            }
        });
    }

    static async updateOne(id, client) {
        return axios.put(`http://localhost:8000/api/customers/${id}`, client);
    }
    static async addOne(client) {
        return axios.post(`http://localhost:8000/api/customers/`, client);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/customers/${id}`);
    }
}