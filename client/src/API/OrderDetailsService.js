import axios from "axios";

export class OrderDetailsService {
    static async addOne(orderDetail) {
        return axios.post(`http://localhost:8000/api/order_details/`, orderDetail);
    }

    static async getByOrder(order) {
        return axios.get(`http://localhost:8000/api/order_details/getByOrder`, {
            params: {
                order
            }
        });
    }

    static async updateOne(id, orderDetail) {
        return axios.put(`http://localhost:8000/api/order_details/${id}`, orderDetail);
    }
}