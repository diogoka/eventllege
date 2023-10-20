import express, { Router } from 'express';
import { getUsers } from '../controllers/usersControllers';

const usersRouter: Router = express.Router();

usersRouter.get('/', getUsers);


export default usersRouter;