import pool from "../db/db";
import express from "express";

export const getOrganizerEvents = async (req: express.Request, res: express.Response) => {

  const SAMPLE_USER_ID = req.query.id_organizer;
  try {
    const events = await pool.query("SELECT * FROM events where id_owner= $1", [SAMPLE_USER_ID]);

    const tags = await pool.query(
      "SELECT events.id_event, tags.name_tag FROM events "+
      "inner join events_tags on events.id_event = events_tags.id_event "+
      "inner join tags on events_tags.id_tag = tags.id_tag where id_owner= $1", [SAMPLE_USER_ID]
      );
      console.log("tags",tags.rows)
      res.status(200).json({
        events: events.rows,
        tags: tags.rows
      });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
  
};

