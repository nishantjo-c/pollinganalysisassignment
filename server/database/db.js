require("dotenv").config();

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: "localhost",
  port: 5432,
});

module.exports = pool;
