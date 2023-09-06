const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "Nish@007",
  database: "voter_registration",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
