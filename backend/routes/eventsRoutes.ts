import express, { Router } from "express";
import { createEvents, getEvents, deleteEvents } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.get("/", getEvents);

eventsRouter.post("/new", createEvents);

eventsRouter.delete("/", deleteEvents);

export default eventsRouter;
