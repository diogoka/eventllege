import pool from '../db/db';
import express from 'express';

export const getAllTags = async (req: express.Request, res: express.Response) => {
    try {
        const tags = await pool.query('SELECT * FROM tags');
        res.json(tags.rows);
    } catch (err: any) {
        console.log(err.message);
    }
}