import express from 'express';
import pool from './db/db';
import usersRouter from './routes/usersRoutes';
import coursesRouter from './routes/coursesRoutes';
import eventsRouter from './routes/eventsRoutes';
import tagsRouter from './routes/tagsRoutes';
import locationRouter from './routes/locationRoutes';
import cors from 'cors';
import 'dotenv/config';

const corsOptions = {
  origin: 'https://eventllege.vercel.app',
  methods: 'GET, POST, PUT, DELETE',
};

type Express = express.Application;

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

pool
  .connect()
  .then(() => console.log('Connected to database'))
  .catch((err) => console.log('Error connecting to database', err));

app.use('/api/users', usersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/events', eventsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/location', locationRouter);

export default app;
