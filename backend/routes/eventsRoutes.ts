import express, { Router } from 'express';
import {
  createEvents,
  getEvents,
  getEvent,
  getUserEvents,
  updateEvents,
  deleteEvents,
  newAttendee,
  deleteAttendee,
  newReview,
  getReviews,
} from '../controllers/eventsControllers';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req: express.Request, file: Express.Multer.File, cb) {
    cb(null, 'public/img/events/temp');
  },

  filename: function (req: express.Request, file: Express.Multer.File, cb) {
    const fileName = Date.now() + '-' + req.body.owner;
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

const eventsRouter: Router = express.Router();

eventsRouter.get('/past', getEvents);
eventsRouter.get('/user', getUserEvents);
eventsRouter.get('/organizer-events', getEvents);

eventsRouter.get('/', getEvents);
eventsRouter.get('/:id', getEvent);

eventsRouter.post('/new', upload.single('picture'), createEvents);

eventsRouter.post('/attendee', newAttendee);
eventsRouter.delete('/attendee', deleteAttendee);

eventsRouter.put('/:id', upload.single('picture'), updateEvents);

eventsRouter.delete('/:id', deleteEvents);

eventsRouter.post('/review/new', newReview);
eventsRouter.get('/reviews/:id', getReviews);

export default eventsRouter;
