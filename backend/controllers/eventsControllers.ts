import pool from '../db/db';
import express from 'express';
import { sendEmail, EmailOption } from '../helpers/mail';

// type EventInput = {
//   owner: string;
//   title: string;
//   description: string;
//   location: string;
//   spots: number;
//   price: number;
//   image: string;
//   tag: number;
// };

export const getEvents = async (req: express.Request, res: express.Response) => {
  const date = new Date();

  try {
    const events = await pool.query('SELECT * FROM events where events.date_event_start >= $1', [date]);
    const tags = await pool.query(
      'SELECT events.id_event, tags.name_tag FROM events ' +
        'inner join events_tags on events.id_event = events_tags.id_event ' +
        'inner join tags on events_tags.id_tag = tags.id_tag'
    );
    res.status(200).json({
      events: events.rows,
      tags: tags.rows,
    });
  } catch (err: any) {
    res.status(500).send(err.message); 
  }
};

export const getEvent = async (req: express.Request, res: express.Response) => {
  const EVENT_ID = req.originalUrl.split('/api/events/')[1];

  try {
    const events = await pool.query('SELECT * FROM events where id_event=$1', [EVENT_ID]);

    const tags = await pool.query(
      'SELECT tags.name_tag FROM events ' +
        'inner join events_tags on events.id_event = events_tags.id_event ' +
        'inner join tags on events_tags.id_tag = tags.id_tag where events.id_event=$1',
      [EVENT_ID]
    );

    const attendees = await pool.query(
      'SELECT users.name_user FROM events ' +
        'inner join attendees on events.id_event = attendees.id_event ' +
        'inner join users on attendees.id_user = users.id_user where events.id_event=$1',
      [EVENT_ID]
    );

    res.status(200).json({
      event: {
        ...events.rows[0],
        tags: tags.rows.map((val) => {
          return val.name_tag;
        }),
        attendees: attendees.rows.map((val) => {
          return val.name_user;
        }),
      },
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getPastEvents = async (req: express.Request, res: express.Response) => {
  const date = new Date();

  try {
    const events = await pool.query('SELECT * FROM events where events.date_event_start < $1', [date]);
    const tags = await pool.query(
      'SELECT events.id_event, tags.name_tag FROM events ' +
        'inner join events_tags on events.id_event = events_tags.id_event ' +
        'inner join tags on events_tags.id_tag = tags.id_tag'
    );
    res.status(200).json({
      events: events.rows,
      tags: tags.rows,
    });
  } catch (err :any) {
    res.status(500).send(err.message);
  }
};

export const createEvents = async (req: express.Request, res: express.Response) => {
  const { owner, title, description, dateStart, dateEnd, location, spots, price, image, tagId, category } = req.body;

  try {
    const events = await pool.query(
      `INSERT INTO
          events (id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, image_event, category_event)
         VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING
         *;
         `,
      [owner, title, description, dateStart, dateEnd, location, spots, price, image, category]
    );

    await pool.query(`INSERT INTO events_tags (id_event, id_tag) VALUES ($1, $2) RETURNING *;`, [
      events.rows[0].id_event,
      tagId,
    ]);
    console.log('post success');

    res.status(201).json(events.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const updateEvents = async (req: express.Request, res: express.Response) => {
  const id = parseInt(req.params.id);

  const { title, description, dateStart, dateEnd, location, spots, price, image, category } = req.body;

  if (!id) {
    console.log('id does not match');
    res.status(404).send('Update events failed');
  } else {
    try {
      const events = await pool.query(
        `UPDATE events SET name_event = $1, description_event = $2, date_event_start = $3, date_event_end = $4, location_event = $5, price_event = $6, image_event = $7, type_event = $8 WHERE id_event = $9 RETURNING *`,
        [title, description, dateStart, dateEnd, location, spots, price, image, category, id]
      );
      res.status(200).json(events.rows);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const deleteEvents = async (req: express.Request, res: express.Response) => {
  console.log(req.params);

  const id = parseInt(req.params.id);
  console.log('here', id);

  if (!id) {
    console.log('id does not match');
    res.status(404).send('Delete events failed');
  } else {
    try {
      console.log('here1');
      const events = await pool.query(`DELETE FROM events WHERE id_event = $1 RETURNING *;`, [id]);
      res.status(200).json(events.rows);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const newAttendee = async (req: express.Request, res: express.Response) => {
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send('Missing parameters');
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

    res.status(201).json(events.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const deleteAttendee = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send('Missing parameters');
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
    res.status(400).send('Missing parameters');
    return;
  }
  console.log("Body",req.body);
  const { id_event, id_user, review } = req.body;
  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (id_user, description_review, rating, date_review)
         VALUES ($1, $2, $3, $4)
         RETURNING *`
    ,
      [id_user, review.description, review.rating, review.date_review]);
      const eventReview = newEventReview(id_event, newReview.rows[0].id_review);

    res.status(201).json(newReview.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

const newEventReview = async (id_event: Number, id_review: Number) => {
  try {
    const newEventReview = await pool.query(
      `INSERT INTO events_reviews (id_event, id_review)
         VALUES ($1, $2)`,
      [id_event, id_review]
    );

    return newEventReview.rows;
  } catch (err: any) {
    return err.message;
  }
};


export const getReviews = async (req: express.Request, res: express.Response) => {
  const event_id = req.params.id;

  try {
    const reviews = await pool.query(`
    SELECT
      u.name_user,
      r.description_review,
      r.rating,
      r.date_review
    FROM
      events_reviews er
    JOIN
      reviews r ON er.id_review = r.id_review
    JOIN
      users u ON r.id_user = u.id_user
    WHERE
      er.id_event = $1;`,
      [event_id]
    );

    res.status(200).json({
      reviews: reviews.rows,
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}

export const sendTicket = async (eventId: any, userId: any) => {
  try {
    const eventResult = await pool.query(
      `
    SELECT
      *
    FROM
      events
    WHERE
      id_event = $1
    `,
      [eventId]
    );
    const event = eventResult.rows[0];

    const userResult = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        id_user = $1
      `,
      [userId]
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
      `,
    });
  } catch (err: any) {
    console.error(err);
  }
};

// function validateEventInput(eventInput: EventInput): { result: boolean; message: string } {
//   let result = false;
//   let message = '';

//   if (!/.+/.test(eventInput.owner)) {
//     message = 'Please enter a owner';
//   } else if (!/.+/.test(eventInput.title)) {
//     message = 'Please enter a title';
//   } else if (!/.+/.test(eventInput.description)) {
//     message = 'Please enter a description';
//   } else if (!/.+/.test(eventInput.location)) {
//     message = 'Please enter a location';
//   } else if (isNaN(eventInput.spots)) {
//     message = 'Invalid Number';
//   } else if (isNaN(eventInput.price)) {
//     message = 'Invalid price';
//   } else if (isNaN(eventInput.tag)) {
//     message = 'Invalid tag';
//   } else {
//     result = true;
//   }

//   return {
//     result,
//     message,
//   };
// }
