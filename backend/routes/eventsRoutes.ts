import express, { Router } from "express";
import {
  createEvents,
  getEvents,
  updateEvents,
  deleteEvents,
  newAttendee,
  deleteAttendee,
} from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents);

eventsRouter.post("/new", createEvents);

eventsRouter.put("/:id", updateEvents);

eventsRouter.delete("/:id", deleteEvents);

eventsRouter.post("/attendee", newAttendee);

eventsRouter.delete("/attendee", deleteAttendee);

export default eventsRouter;
