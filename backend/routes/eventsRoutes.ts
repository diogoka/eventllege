import express, { Router } from "express";
import { createEvent } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.post("/new", createEvent);

export default eventsRouter;
