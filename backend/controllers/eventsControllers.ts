import pool from '../db/db';
import express from 'express';

export const getEvents = async (req: express.Request, res: express.Response) => {
    try {
        const users = await pool.query('SELECT * FROM events');
        res.json(users.rows);
        
    } catch (_err) {
        // console.log(err.message);
    }

}