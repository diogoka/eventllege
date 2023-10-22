import express, { Router } from 'express';
import { getEvents } from '../controllers/eventsControllers';

const eventsRouter: Router = express.Router();

eventsRouter.get('/', getEvents);


export default eventsRouter;