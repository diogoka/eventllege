import pool from "../db/db";
import express from "express";

export const createEvent = async (req: express.Request, res: express.Response) => {
  try {
    const {
      id_event,
      id_owner,
      name_event,
      description_event,
      date_event_start,
      date_event_end,
      location_event,
      capacity_event,
      price_event,
      image_event,
      type_event,
    } = req.body;
    const insertQuery =
      "INSERT INTO event (id_event, id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, image_event, type_event) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
    const values = [
      id_event,
      id_owner,
      name_event,
      description_event,
      date_event_start,
      date_event_end,
      location_event,
      capacity_event,
      price_event,
      image_event,
      type_event,
    ];

    const rows = await pool.query(insertQuery, values);
    console.log(rows);
  } catch (err) {
    console.error("Error created events", err);
    res.status(500).send("Error creating events");
  }
};
