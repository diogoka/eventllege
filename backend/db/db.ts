import { Pool } from 'pg';
import 'dotenv/config';

const host = String(process.env.HOST);
const user = String(process.env.USER);
const password = String(process.env.PASSWORD);
const database = String(process.env.DATABASE);
const port_db = Number(process.env.PORT_DB);

const pool = new Pool({
  user: user,
  host: host,
  password: password,
  database: database,
  port: port_db,
});

export default pool;
