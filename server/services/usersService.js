import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool } from "../config/db.js";

const generateAccessToken = (id, role) => {
    const payload = {
        id, role
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });
}

class UsersService {
    async authorization(username, password) {
        const user = await pool.query(`
            SELECT *
            FROM "users"
            WHERE "username" = '${username}'
        `);

        if (user.rows.length === 0) {
            throw new Error("Неверный логин/пароль");
        }

        const validPassword = bcrypt.compareSync(password, user.rows[0].password);

        if (!validPassword) {
            throw new Error("Неверный логин/пароль");
        }

        const token = generateAccessToken(user.rows[0].id, user.rows[0].role);

        return user;
    }

    async getAll() {
        const users = await pool.query(`
            SELECT *
            FROM "users"
        `);

        return users;
    }

    async getOne(id) {
        let sqlQuery = `
            SELECT *
            FROM "users"
            WHERE "id" = ${id}
        `;

        const user = await pool.query(sqlQuery);

        return user;
    }

    async registration(username, password, role) {
        const candidate = await pool.query(`
            SELECT *
            FROM "users"
            WHERE username = '${username}'
        `);

        if (candidate.rows.length !== 0) {
            throw new Error("Пользователь с таким username уже зарегистрирован");
        }

        const hashedPassword = bcrypt.hashSync(password, 7);

        const user = await pool.query(`
            INSERT INTO "users" ("username", "password", "role")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, hashedPassword, role]);

        return user;
    }

    async updateOne(id, fields) {
        const updatedUser = await pool.query(`
            UPDATE "users"
            SET "username" = $1,
                "password" = $2,
                "role" = $3
            WHERE "id" = ${id}
            RETURNING *;
        `, fields);

        return updatedUser;
    }

    async deleteOne(id) {
        const deletedUser = await pool.query(`
            DELETE FROM "users"
            WHERE "id" = ${id}
            RETURNING *;
        `,);

        return deletedUser;
    }
}

export default new UsersService();