import express, { Router } from "express";
import { createEvent } from "../controllers/eventsControllers";

const eventsRouter: Router = express.Router();

eventsRouter.post("/events", async (req: express.Request, res: express.Response) => {
  createEvent(req, res);
});

export default eventsRouter;
