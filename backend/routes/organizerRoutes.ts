import express, { Router } from 'express';
import { getOrganizerEvents } from '../controllers/organizersControllers';

const organizerRouter: Router = express.Router();

organizerRouter.get('/', getOrganizerEvents);

export default organizerRouter;