import pool from '../db/db';
import express from 'express';
import { sendEmail, EmailOption } from '../helpers/mail';
import fs from 'fs-extra';

type EventInput = {
  owner: string;
  title: string;
  description: string;
  dates: Array<Date>;
  location: string;
  spots: number;
  price: number;
  image: string;
  tag: number;
};

type Date = {
  dateStart: string;
  dateEnd: string;
};

export const getEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const numOfDays = Number(req.query.numOfDays ? req.query.numOfDays : 60);
    const today = new Date().toLocaleString('en-US', {
      timeZone: 'America/Vancouver',
    });
    const dayFromNow = new Date(
      new Date().getTime() + numOfDays * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const events = req.query.past
      ? req.query.attendees
        ? await pool.query(
            `SELECT
              events.id_event,
              events.name_event,
              events.date_event_start,
              events.date_event_end,
              events.location_event,
              events.description_event,
              events.price_event,
              events.capacity_event,
              events.category_event,
              json_agg(attendees) AS attendees
            FROM
              events
            LEFT JOIN
              attendees ON events.id_event = attendees.id_event
            WHERE
              events.date_event_start < $1
            GROUP BY
              events.id_event,
              events.name_event,
              events.date_event_start,
              events.date_event_end,
              events.location_event,
              events.description_event,
              events.price_event,
              events.capacity_event,
              events.category_event
            ORDER BY
              events.date_event_start ASC`,
            [today]
          )
        : await pool.query(
            `SELECT * FROM events where events.date_event_start <= $1 ORDER BY events.date_event_start ASC`,
            [today]
          )
      : await pool.query(
          `SELECT * FROM events where events.date_event_start >= $1 and events.date_event_start < $2 ORDER BY events.date_event_start ASC`,
          [today, dayFromNow]
        );

    const ids =
      events.rows.length !== 0
        ? events.rows.map((val) => {
            return val.id_event;
          })
        : null;

    const tags = await pool.query(`
      SELECT events.id_event, tags.name_tag FROM events
      inner join events_tags on events.id_event = events_tags.id_event
      inner join tags on events_tags.id_tag = tags.id_tag where events_tags.id_event in (${ids})
      `);

    res.status(200).json({
      events: events.rows,
      tags: tags.rows,
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getPastEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const numOfDays = Number(req.query.numOfDays ? req.query.numOfDays : 180);
    const dateLimit = new Date(
      new Date().getTime() - numOfDays * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const today = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const events = await pool.query(
      `SELECT * FROM events where events.date_event_start >= $1 and events.date_event_start < $2 ORDER BY events.date_event_start ASC`,
      [dateLimit, today]
    );

    const ids =
      events.rows.length !== 0
        ? events.rows.map((val) => {
            return val.id_event;
          })
        : null;

    const tags = await pool.query(`
      SELECT events.id_event, tags.name_tag FROM events
      inner join events_tags on events.id_event = events_tags.id_event
      inner join tags on events_tags.id_tag = tags.id_tag where events_tags.id_event in (${ids})
      `);

    res.status(200).json({
      events: events.rows,
      tags: tags.rows,
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getEventsByUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = req.params.id;

    const events = await pool.query(
      `
    SELECT 
    *
    FROM 
    attendees
    JOIN 
    events ON attendees.id_event = events.id_event
    WHERE 
    attendees.id_user = $1;
    `,
      [user]
    );

    let tags: any = [];
    if (events.rows.length !== 0) {
      const ids = events.rows.map((val) => val.id_event);
      tags = await pool.query(`
        SELECT 
          events.id_event, 
          tags.name_tag 
        FROM 
          events
        INNER JOIN 
          events_tags ON events.id_event = events_tags.id_event
        INNER JOIN 
          tags ON events_tags.id_tag = tags.id_tag 
        WHERE 
          events.id_event IN (${ids.join(',')});
      `);
    }

    if (req.query.search) {
      const text = req.query.search !== undefined ? req.query.search : '';
      const searchWords = text.toString().toLowerCase().split(' ');

      const filteredEvents = events.rows.filter((event: any) => {
        return searchWords.some((word) => {
          return event.name_event.toLowerCase().includes(word);
        });
      });

      if (req.query.past) {
        const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let pastEvents = filteredEvents.filter((event: any) => {
          return new Date(event.date_event_start).toISOString() < today;
        });

        if (pastEvents.length === 0) {
          res.status(200).json({
            events: [],
            tags: [],
          });
          return;
        } else {
          const ids = pastEvents.map((val: any) => {
            return val.id_event;
          });
          tags = await pool.query(`
          SELECT 
            events.id_event, 
            tags.name_tag 
          FROM 
            events
          INNER JOIN 
            events_tags ON events.id_event = events_tags.id_event
          INNER JOIN 
            tags ON events_tags.id_tag = tags.id_tag 
          WHERE 
            events.id_event IN (${ids.join(',')});
        `);
          res.status(200).json({
            events: pastEvents,
            tags: tags.rows,
          });
        }
      } else {
        if (filteredEvents.length === 0) {
          res.status(200).json({
            events: [],
            tags: [],
          });
          return;
        } else {
          const ids = filteredEvents.map((val: any) => {
            return val.id_event;
          });
          tags = await pool.query(`
          SELECT 
            events.id_event, 
            tags.name_tag 
          FROM 
            events
          INNER JOIN 
            events_tags ON events.id_event = events_tags.id_event
          INNER JOIN 
            tags ON events_tags.id_tag = tags.id_tag 
          WHERE 
            events.id_event IN (${ids.join(',')});
        `);
          res.status(200).json({
            events: filteredEvents,
            tags: tags.rows,
          });
        }
      }
    } else {
      res.status(200).json({
        events: events.rows,
        tags: tags.rows,
      });
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const searchEvents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const text = req.query.text !== undefined ? req.query.text : '';
    const searchWords = text.toString().toLowerCase().split(' ');
    const today = new Date().toISOString().slice(0, 19).replace('T', ' ');

    let query = 'SELECT * FROM events WHERE ';

    if (searchWords.length === 1) {
      query += `LOWER(events.name_event) LIKE '%${searchWords[0]}%'`;
    } else {
      searchWords.forEach((word: string, key: number) => {
        query +=
          key === searchWords.length - 1
            ? ` LOWER(events.name_event) LIKE '%${word}%'`
            : ` LOWER(events.name_event) LIKE '%${word}%' AND`;
      });
    }

    query = req.query.past
      ? `${query} and events.date_event_start < '%${today}%'`
      : `${query} and events.date_event_start >= '%${today}%'`;

    const events = req.query.past
      ? await pool.query(query)
      : await pool.query(query);

    const ids =
      events.rows.length !== 0
        ? events.rows.map((val) => {
            return val.id_event;
          })
        : null;

    const tags = await pool.query(`
      SELECT events.id_event, tags.name_tag FROM events
      inner join events_tags on events.id_event = events_tags.id_event
      inner join tags on events_tags.id_tag = tags.id_tag where events_tags.id_event in (${ids})
      ORDER BY events.date_event_start ASC
      `);

    const id = req.query.id ? req.query.id : null;

    if (id) {
      let eventsByUser = events.rows.filter((event: any) => {
        return event.id_owner === id;
      });
      return res.status(200).json({
        events: eventsByUser,
        tags: tags.rows,
      });
    } else {
      return res.status(200).json({
        events: events.rows,
        tags: tags.rows,
      });
    }
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getEventsByOwner = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const owner_id = req.params.id;
    let query = '';
    const today = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (req.query.past) {
      query = `
        SELECT * FROM events WHERE events.id_owner = '${owner_id}' and events.date_event_start < '${today}' ORDER BY events.date_event_start ASC;
      `;
    } else {
      query = `
        SELECT * FROM events WHERE events.id_owner = '${owner_id}' and events.date_event_start > '${today}' ORDER BY events.date_event_start ASC;
      `;
    }

    const events = await pool.query(query);

    let tags: any = [];
    if (events.rows.length !== 0) {
      const ids = events.rows.map((val) => val.id_event);
      tags = await pool.query(`
        SELECT 
          events.id_event, 
          tags.name_tag 
        FROM 
          events
        INNER JOIN 
          events_tags ON events.id_event = events_tags.id_event
        INNER JOIN 
          tags ON events_tags.id_tag = tags.id_tag 
        WHERE 
          events.id_event IN (${ids.join(',')});
      `);
    }

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
    const events = await pool.query('SELECT * FROM events where id_event=$1', [
      EVENT_ID,
    ]);

    const tags = await pool.query(
      'SELECT tags.id_tag, tags.name_tag FROM events ' +
        'inner join events_tags on events.id_event = events_tags.id_event ' +
        'inner join tags on events_tags.id_tag = tags.id_tag where events.id_event=$1',
      [EVENT_ID]
    );

    const attendees = await pool.query(
      'SELECT users.id_user, users.name_user FROM events ' +
        'inner join attendees on events.id_event = attendees.id_event ' +
        'inner join users on attendees.id_user = users.id_user where events.id_event=$1',
      [EVENT_ID]
    );

    res.status(200).json({
      event: {
        ...events.rows[0],
        tags: tags.rows.map((val) => {
          return {
            id_tag: val.id_tag,
            name_tag: val.name_tag,
          };
        }),
        attendees: attendees.rows.map((val) => {
          return {
            id: val.id_user,
            name: val.name_user,
          };
        }),
      },
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getUserEvents = async (
  req: express.Request,
  res: express.Response
) => {
  const date = new Date();
  const SAMPLE_USER = req.query.id_user;

  try {
    const att = await pool.query(
      'SELECT * FROM attendees ' +
        'inner join events on attendees.id_event = events.id_event ' +
        'where attendees.id_user = $1 and events.date_event_start >= $2',
      [SAMPLE_USER, date]
    );

    const ids = att.rows.map((val) => {
      return val.id_event;
    });

    const tags = await pool.query(
      `SELECT events.id_event, tags.name_tag FROM events ` +
        `inner join events_tags on events.id_event = events_tags.id_event ` +
        `inner join tags on events_tags.id_tag = tags.id_tag where events_tags.id_event in (${ids})`
    );

    const attendees = await pool.query(
      `SELECT users.name_user, attendees.id_event FROM events ` +
        `inner join attendees on events.id_event = attendees.id_event ` +
        `inner join users on attendees.id_user = users.id_user where attendees.id_event in (${ids})`
    );

    const events = att.rows.map((val) => {
      return {
        ...val,

        tags: tags.rows
          .filter((tag) => {
            return val.id_event == tag.id_event ? true : false;
          })
          .map((t) => {
            return t.name_tag;
          }),

        attendees: attendees.rows
          .filter((att) => {
            return val.id_event == att.id_event ? true : false;
          })
          .map((a) => {
            return a.name_user;
          }),
      };
    });

    res.json({
      events: events,
    });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const createEvents = async (
  req: express.Request,
  res: express.Response
) => {
  const {
    owner,
    title,
    description,
    dates,
    location,
    spots,
    price,
    // picture,
    tagId,
    category,
  } = req.body;

  console.log('dates', req.body.dates);

  const formatToPST = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      timeZone: 'America/Vancouver',
    });
  };

  console.log('Formatted', formatToPST(dates[0].dateStart));

  try {
    dates.forEach(async (date: Date) => {
      const events = await pool.query(`
        INSERT INTO
        events (id_owner, name_event, description_event, date_event_start, date_event_end, location_event, capacity_event, price_event, category_event)
        VALUES ('${owner}','${title}','${description}','${formatToPST(
        date.dateStart
      )}','${formatToPST(
        date.dateEnd
      )}','${location}','${spots}','${price}','${category}')
        RETURNING *;
      `);

      if (req.file) {
        copyImage(req.file.filename, events.rows[0].id_event);
        setTimeout(() => {
          if(req.file) {
            deleteImage(req.file.filename);
          }
        }, 3000);
      }

      tagId.forEach((id: string) => {
        pool.query(
          `INSERT INTO events_tags (id_event, id_tag) VALUES ('${events.rows[0].id_event}','${id}') RETURNING *;`
        );
      });
      // res.status(201).json(events.rows);
    });
    res.status(201).json({});
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const updateEvents = async (
  req: express.Request,
  res: express.Response
) => {
  const id = parseInt(req.params.id);

  const {
    title,
    description,
    dates,
    location,
    spots,
    price,
    image,
    tagId,
    category,
  } = req.body;

  if (!id) {
    res.status(404).send('Update events failed');
  } else {
    try {
      dates.forEach(async (date: Date) => {
        const events = await pool.query(
          `UPDATE events SET name_event = $1, description_event = $2, date_event_start = $3, date_event_end = $4, location_event = $5, capacity_event = $6, price_event = $7, image_event = $8, category_event = $9 WHERE id_event = $10 RETURNING *`,
          [
            title,
            description,
            date.dateStart,
            date.dateEnd,
            location,
            spots,
            price,
            image,
            category,
            id,
          ]
        );

        await pool.query(`DELETE FROM events_tags WHERE id_event = $1`, [id]);
        tagId.forEach(async (tag: number) => {
          await pool.query(
            `INSERT INTO events_tags (id_event, id_tag) VALUES ($1, $2) RETURNING *;`,
            [id, tag]
          );
        });

        if (req.file) {
          copyImage(req.file.filename, events.rows[0].id_event);
          setTimeout(() => {
            if(req.file){
              deleteImage(req.file.filename);
            }
          }, 3000);
        }
      });

      res.status(200).json({});
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const deleteEvents = async (
  req: express.Request,
  res: express.Response
) => {
  const id = parseInt(req.params.id);

  if (!id) {
    res.status(404).send('Delete events failed');
  } else {
    try {
      const events = await pool.query(
        `DELETE FROM events WHERE id_event = $1 RETURNING *;`,
        [id]
      );
      res.status(200).json(events.rows);
    } catch (err: any) {
      res.status(500).send(err.message);
    }
  }
};

export const newAttendee = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send('Missing parameters');
    return;
  }
  const { id_event, id_user } = req.body;
  try {
    const updateAvailableSpots = await pool.query(
      `UPDATE events SET capacity_event = capacity_event - 1 WHERE id_event = $1 RETURNING *;`,
      [id_event]
    );

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

export const deleteAttendee = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.body.id_event || !req.body.id_user) {
    res.status(400).send('Missing parameters');
    return;
  }
  const { id_event, id_user } = req.body;
  try {
    const updateAvailableSpots = await pool.query(
      `UPDATE events SET capacity_event = capacity_event + 1 WHERE id_event = $1 RETURNING *;`,
      [id_event]
    );

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

export const newReview = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.body.id_event || !req.body.id_user || !req.body.review) {
    res.status(400).send('Missing parameters');
    return;
  }

  const { id_event, id_user, review } = req.body;
  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (id_user, description_review, rating, date_review)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
      [id_user, review.description, review.rating, review.date_review]
    );
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

export const getReviews = async (
  req: express.Request,
  res: express.Response
) => {
  const event_id = req.params.id;
  try {
    const reviews = await pool.query(
      `
    SELECT
      u.name_user,
      u.id_user,
      r.description_review,
      r.rating,
      r.date_review,
      r.id_review
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
};

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

function validateEventInput(eventInput: EventInput): {
  result: boolean;
  message: string;
} {
  let result = false;
  let message = '';

  if (!eventInput.owner) {
    message = 'Invalid owner';
  } else if (!/.+/.test(eventInput.title)) {
    message = 'Please enter a title';
  } else if (!/.+/.test(eventInput.description)) {
    message = 'Please enter a description';
  } else if (!eventInput.dates) {
    message = 'Please chose a date';
  } else if (!/.+/.test(eventInput.location)) {
    message = 'Please enter a location';
  } else if (isNaN(eventInput.spots)) {
    message = 'Invalid spots ';
  } else if (isNaN(eventInput.price)) {
    message = 'Invalid price';
  } else if (isNaN(eventInput.tag)) {
    message = 'Invalid tag';
  } else {
    result = true;
  }

  return {
    result,
    message,
  };
}

function copyImage(filename: string, eventId: number) {
  const oldPath = `${__dirname}/../public/img/events/temp/${filename}`;
  const newPath = `${__dirname}/../public/img/events/${eventId}`;
  fs.copySync(oldPath, newPath, { overwrite: true });
}

function deleteImage(filename: string) {
  fs.remove(`${__dirname}/../public/img/events/temp/${filename}`);
}
