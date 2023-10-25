import pool from "../db/db";
import express from "express";

export const getOrganizerEvents = async (req: express.Request, res: express.Response) => {

  const SAMPLE_USER_ID = req.query.id_organizer;
  try {
    const users = await pool.query("SELECT * FROM events where id_owner= $1", [SAMPLE_USER_ID]);
    res.json(users.rows);
  } catch (_err) {
    // console.log(err.message);
  }
  
};

