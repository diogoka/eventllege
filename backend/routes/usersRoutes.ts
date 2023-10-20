import express, { Router } from 'express';
import { getUsers, createUser } from '../controllers/usersControllers';

const usersRouter: Router = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);


export default usersRouter;