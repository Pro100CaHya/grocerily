import axios from "axios";

export class ProductsService {
    static async getAll(category_and_supplier_name = false) {
        return axios.get(`http://localhost:8000/api/products`, {
            params: {
                category_and_supplier_name
            }
        });
    }

    static async getOne(id) {
        return axios.get(`http://localhost:8000/api/products/${id}`);
    }

    static async updateOne(id, product) {
        return axios.put(`http://localhost:8000/api/products/${id}`, product);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/products/${id}`);
    }

    static async addOne(product) {
        return axios.post(`http://localhost:8000/api/products/`, product);
    }
}