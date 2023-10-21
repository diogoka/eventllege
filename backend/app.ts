import express from "express";
import pool from "./db/db";
import usersRoutes from "./routes/usersRoutes";
import eventsRoutes from "./routes/eventsRoutes";

type Express = express.Application;

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

pool
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database", err));

app.use("/api/users", usersRoutes);
app.use("/api/users", eventsRoutes);

export default app;
