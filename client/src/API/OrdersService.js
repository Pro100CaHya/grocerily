import axios from "axios";

export class OrdersService {
    static async addOne(order) {
        return axios.post(`http://localhost:8000/api/orders/`, order);
    }

    static async getByCustomer(customer) {
        return axios.get(`http://localhost:8000/api/orders/getByCustomer`, {
            params: {
                customer
            }
        });
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/orders/${id}`);
    }
}