import axios from "axios";

export class CategoriesService {
    static async getAll() {
        return axios.get(`http://localhost:8000/api/categories/`);
    }

    static async getOne(id) {
        return axios.get(`http://localhost:8000/api/categories/${id}`);
    }

    static async updateOne(id, category) {
        return axios.put(`http://localhost:8000/api/categories/${id}`, category);
    }
    static async addOne(category) {
        return axios.post(`http://localhost:8000/api/categories/`, category);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/categories/${id}`);
    }
}