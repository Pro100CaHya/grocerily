import axios from "axios";

export class SuppliersService {
    static async getAll() {
        return axios.get(`http://localhost:8000/api/suppliers/`);
    }

    static async getOne(id) {
        return axios.get(`http://localhost:8000/api/suppliers/${id}`);
    }

    static async updateOne(id, supplier) {
        return axios.put(`http://localhost:8000/api/suppliers/${id}`, supplier);
    }
    
    static async addOne(supplier) {
        return axios.post(`http://localhost:8000/api/suppliers/`, supplier);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/suppliers/${id}`);
    }

    static async getSuppliersThatHaveGoods(getSuppliersThatHaveGoods) {
        return axios.get(`http://localhost:8000/api/suppliers/`, {
            params: {
                getSuppliersThatHaveGoods
            }
        });
    }
}