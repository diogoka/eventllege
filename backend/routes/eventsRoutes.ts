
import express, { Router } from "express";
import {
  createEvents,
  getEvents,
  updateEvents,
  deleteEvents,
  newAttendee,
  deleteAttendee,
  newReview,
} from "../controllers/eventsControllers";


const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents);
eventsRouter.post("/new", createEvents);


eventsRouter.post("/attendee", newAttendee);
eventsRouter.delete("/attendee", deleteAttendee);

eventsRouter.put("/:id", updateEvents);

eventsRouter.delete("/:id", deleteEvents);

eventsRouter.post("/review/new", newReview);

export default eventsRouter;

