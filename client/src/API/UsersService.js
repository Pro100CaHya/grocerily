import axios from "axios";

export class UserService {
    static async authorization(authData) {
        return axios.post(`http://localhost:8000/api/users/authorization`, authData);
    }

    static async registration(user) {
        return axios.post(`http://localhost:8000/api/users/registration`, user);
    }

    static async getOne(id) {
        return axios.get(`http://localhost:8000/api/users/${id}`);
    }

    static async getAll(id) {
        return axios.get(`http://localhost:8000/api/users/`);
    }

    static async updateOne(id, user) {
        return axios.put(`http://localhost:8000/api/users/${id}`, user);
    }

    static async deleteOne(id) {
        return axios.delete(`http://localhost:8000/api/users/${id}`);
    }
}