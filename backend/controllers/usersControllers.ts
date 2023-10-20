import pool from '../db/db';
import express from 'express';


export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        // const events = await pool.query('SELECT * FROM events');
        // res.json(events.rows);
        res.status(200).json(users.rows);
    } catch (err) {
        console.log(err.message);
    }
}
