import { pool } from "../config/db.js";

class CustomersService {
    async createOne(fields) {
        const createdCustomer = await pool.query(`
            INSERT INTO "customers" ("surname", "name", "patronym", "telephone", "user")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, fields);

        return createdCustomer;
    }

    async deleteOne(id) {
        const deletedCustomer = await pool.query(`
            DELETE FROM "customers"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedCustomer;
    }

    async getAll() {
        const customers = await pool.query(`
            SELECT *
            FROM "customers"
            ORDER BY "id"
        `);

        return customers;
    }

    async getOne(id) {
        let sqlQuery = `
            SELECT *
            FROM "customers"
            WHERE "id" = ${id}
        `;

        const customer = await pool.query(sqlQuery);

        return customer;
    }

    async getByUserId(id) {
        let sqlQuery = `
            SELECT *
            FROM "customers"
            WHERE "user" = ${id}
        `;

        const customer = await pool.query(sqlQuery);

        return customer;
    }

    async updateOne(id, fields) {
        const updatedCustomer = await pool.query(`
            UPDATE "customers"
            SET "surname" = $1,
                "name" = $2,
                "patronym" = $3,
                "telephone" = $4,
                "user" = $5
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedCustomer;
    }
}

export default new CustomersService();