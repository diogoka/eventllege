import express, { Router } from "express";
import { createEvents, getEvents, deleteEvents, newAttendee } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents);

eventsRouter.post("/new", createEvents);

eventsRouter.delete("/:id", deleteEvents);

eventsRouter.post("/attendee", newAttendee);

export default eventsRouter;
