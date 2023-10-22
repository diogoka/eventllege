import express, { Router } from 'express';
import { getCourses } from '../controllers/coursesControllers';

const coursesRouter: Router = express.Router();

coursesRouter.get('/', getCourses);

export default coursesRouter;