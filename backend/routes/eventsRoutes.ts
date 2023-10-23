
import express, { Router } from "express";
import { createEvent,getEvents } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.get('/', getEvents);

eventsRouter.post("/new", createEvent);

export default eventsRouter;

