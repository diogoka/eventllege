import express from "express";
import pool from "./db/db";
import usersRouter from "./routes/usersRoutes";
import coursesRouter from "./routes/coursesRoutes";
import eventsRouter from "./routes/eventsRoutes";
import organizerRouter from "./routes/organizerRoutes";
import cors from "cors";
import 'dotenv/config'



const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, DELETE"
};


type Express = express.Application;

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

pool
    .connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log('Error connecting to database', err));

app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/organizer-events", organizerRouter);

export default app;
