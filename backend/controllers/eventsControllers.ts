import pool from "../db/db";
import express from "express";

export const getEvents = async (req: express.Request, res: express.Response) => {
  try {
    const users = await pool.query("SELECT * FROM events");
    res.json(users.rows);
  } catch (_err) {
    // console.log(err.message);
  }
};

export const createEvents = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  const { id_owner, name, description, date_event_start, date_event_end, location, capacity, price, image, type } =
    req.body;

  try {
    const events = await pool.query(
      `INSERT INTO
          events (id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, image_event, type_event)
         VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING
         *;
         `,
      [id_owner, name, description, date_event_start, date_event_end, location, capacity, price, image, type]
    );
    console.log("post success");

    res.status(200).json(events.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteEvents = async (req: express.Request, res: express.Response) => {};
