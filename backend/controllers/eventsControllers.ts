import pool from "../db/db";
import express from "express";
import { sendEmail, EmailOption } from "../helpers/mail";

export const getEvents = async (req: express.Request, res: express.Response) => {
  try {
    const events = await pool.query("SELECT * FROM events");
    const tags = await pool.query(
      "SELECT events.id_event, tags.name_tag FROM events " +
      "inner join events_tags on events.id_event = events_tags.id_event " +
      "inner join tags on events_tags.id_tag = tags.id_tag"
    );
    res.json({
      events: events.rows,
      tags: tags.rows
    });
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
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const updateEvents = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);
  const { name, description, date_event_start, date_event_end, location, capacity, price, image, type } = req.body;

  if (!id) {
    console.log("id does not match");
    res.status(404).send("Update events failed");
  } else {
    try {
      const events = await pool.query(
        `UPDATE events SET name_event = $1, description_event = $2, date_event_start = $3, date_event_end = $4, location_event = $5, capacity_event = $6, price_event = $7, image_event = $8, type_event = $9 WHERE id_event = $10 RETURNING *`,
        [name, description, date_event_start, date_event_end, location, capacity, price, image, type, id]
      );
      res.status(200).json(events.rows);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const deleteEvents = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    console.log("id does not match");
    res.status(404).send("Delete events failed");
  } else {
    try {
      const events = await pool.query(`DELETE FROM events WHERE id_event = $1 RETURNING *;`, [id]);
      res.status(200).json(events.rows);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const newAttendee = async (req: express.Request, res: express.Response) => {
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send("Missing parameters");
    return;
  }
  const { id_event, id_user } = req.body;
  try {
    const events = await pool.query(
      `INSERT INTO
          attendees (id_event, id_user)
         VALUES
          ($1, $2)
         RETURNING
         *;
         `,
      [id_event, id_user]
    );

    await sendTicket(id_event, id_user);

    res.status(200).json(events.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const deleteAttendee = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send("Missing parameters");
    return;
  }
  const { id_event, id_user } = req.body;
  try {
    const events = await pool.query(
      `DELETE FROM
          attendees
         WHERE
          id_event = $1 AND id_user = $2
         RETURNING
         *;
         `,
      [id_event, id_user]
    );

    res.status(200).json(events.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};


export const newReview = async (req: express.Request, res: express.Response) => {
  if (!req.body.id_event || !req.body.id_user || !req.body.review) {
    res.status(400).send("Missing parameters");
    return;
  }
  const { id_event, id_user, review } = req.body;
  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (id_user, description_review, rating, date_review)
         VALUES ($1, $2, $3, $4)
         RETURNING *`
      ,
      [id_user, review.description, review.rating, review.date]);
    const eventReview = newEventReview(id_event, newReview.rows[0].id_review);

    res.status(200).json(newReview.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

const newEventReview = async (id_event: Number, id_review: Number) => {
  try {
    const newEventReview = await pool.query(
      `INSERT INTO events_reviews (id_event, id_review)
         VALUES ($1, $2)`
      ,
      [id_event, id_review]);

    return newEventReview.rows;
  } catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

export const sendTicket = async (eventId, userId) => {

  try {
    const eventResult = await pool.query(`
    SELECT
      *
    FROM
      events
    WHERE
      id_event = $1
    `, [eventId]
    );
    const event = eventResult.rows[0];

    const userResult = await pool.query(`
      SELECT
        *
      FROM
        users
      WHERE
        id_user = $1
      `, [userId]
    );
    const user = userResult.rows[0];

    await sendEmail({
      to: [user.email_user],
      subject: `
        Your Ticket for ${event.name_event}
      `,
      text: `
        Hi, ${user.name_user}. Thank you for joining our event.
        This is your ticket.
        Event Name: ${event.name_event}
        Date: ${event.date_event_start.toDateString()}
        Place: ${event.location_event}
      `
    });
  } catch (err: any) {
    console.error(err);
  }
};