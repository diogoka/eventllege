import express, { Router } from 'express';
import {
  createEvents,
  getEvents,
  getEvent,
  getPastEvents,
  updateEvents,
  deleteEvents,
  newAttendee,
  deleteAttendee,
  newReview,
} from '../controllers/eventsControllers';
import multer from 'multer';
import path from 'path';
import { upload } from './usersRoutes';

const storage = multer.diskStorage({
  destination: function (req: express.Request, file: Express.Multer.File, cb) {
    cb(null, 'public/img/events/');
  },

  filename: function (req: express.Request, file: Express.Multer.File, cb) {
    const ext = path.extname(file.originalname);
    const fileName = req.body.name + ext;
    cb(null, fileName);
  },
});

const eventsRouter: Router = express.Router();

eventsRouter.get('/past', getPastEvents);

eventsRouter.get('/', getEvents);
eventsRouter.get('/:id', getEvent);


eventsRouter.post('/new', upload.single('picture'), createEvents);

eventsRouter.post('/attendee', newAttendee);
eventsRouter.delete('/attendee', deleteAttendee);

eventsRouter.put('/:id', updateEvents);

eventsRouter.put('/:id', updateEvents);

eventsRouter.delete('/:id', deleteEvents);

eventsRouter.post('/review/new', newReview);

export default eventsRouter;
