import pool from '../db/db';
import express from 'express';

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (_err) {
        // console.log(err.message);
    }
}

export const createUser = async (req: express.Request, res: express.Response) => {

    const { id, type, name, email, postalCode, phone, avatar } = req.body;

    if(!/^[A-Za-z0-9]{10,}$/.test(id)) {
        res.status(500).send("Invalid ID");
        return;
    } else if(!/^[1-3]{1}$/.test(type)) {
        res.status(500).send("Invalid User Type");
        return;
    } else if(!/^[^@]+@[^.]+\..+$/.test(email)) {
        res.status(500).send("Invalid Email");
        return;
    } else if(!/^[A-Za-z0-9]{3}(-|\s)?[A-Za-z0-9]{3}$/.test(postalCode)) {
        res.status(500).send("Invalid Postal Code");
        return;
    } else if(!/^[A-Za-z0-9]{,15}$/.test(phone)) {
        res.status(500).send("Invalid Postal Code");
        return;
    }

    try {
        const user = await pool.query(`
            INSERT INTO
                users (id_user, id_user_type, name_user, email_user, postal_code_user, phone_user, avatar_user)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7)
            RETURNING
                *;
            `, [id, type, name, email, postalCode, phone, avatar]);
        res.status(200).json(user.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}