import express, { Router } from "express";
import { createEvents, getEvents, deleteEvents, newAttendee, deleteAttendee } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents);
eventsRouter.post("/new", createEvents);

eventsRouter.post("/attendee", newAttendee);
eventsRouter.delete("/attendee", deleteAttendee);

eventsRouter.delete("/:id", deleteEvents);

export default eventsRouter;
