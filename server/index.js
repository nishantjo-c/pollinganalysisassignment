const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const pool = require("./database/db");

app.use(express.json());

// all votes data
app.get("/data", async (req, res) => {
  try {
    const voter = await pool.query(`SELECT * FROM data ORDER BY date`);
    res.json({ data: voter.rows });
    // res.send({ msg: "yo" });
  } catch (error) {
    console.error(error.message);
  }
});

// adding a vote
app.post("/vote", async (req, res) => {
  const { name, choice } = req.body;
  // console.log(name, choice);
  // res.send({ name: name, choice: choice });
  // console.log(req.body);
  try {
    const vote = await pool.query(
      `INSERT INTO data (name, vote_choice, "date") VALUES ($1, $2, $3) RETURNING *`,
      [name, choice, new Date()]
    );
    res.json(vote.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// votes data by voting_choice (for line chart)
app.get("/counts", async (req, res) => {
  try {
    // by true and false
    const { voting_choice } = req.query;
    // console.log(voting_choice.toLowerCase());
    if (
      voting_choice.toLowerCase() !== "default" &&
      voting_choice.toLowerCase() !== "true" &&
      voting_choice.toLowerCase() !== "false"
    ) {
      return console.error("wrong value");
    }

    // in case of both by default condition
    if (voting_choice.toLowerCase() === "default") {
      const voted = await pool.query(
        `SELECT COUNT(*), date FROM data WHERE vote_choice = true GROUP BY date ORDER BY date`
        // [voting_choice.toLowerCase()]
      );
      const notvoted = await pool.query(
        `SELECT COUNT(*), date FROM data WHERE vote_choice = false GROUP BY date ORDER BY date`
        // [voting_choice.toLowerCase()]
      );
      res.json({ data: { voted: voted.rows, notvoted: notvoted.rows } });
    } else {
      const voted = await pool.query(
        `SELECT COUNT(*), date FROM data WHERE vote_choice = ${voting_choice.toLowerCase()} GROUP BY date ORDER BY date`
      );
      res.json({ data: voted.rows });
    }
  } catch (error) {
    console.error(error.message);
  }
});

// votes data by voting_choice (for bar chart)
app.get("/results", async (req, res) => {
  try {
    const data = await pool.query(
      `SELECT COUNT(*), vote_choice FROM data GROUP BY vote_choice`
    );
    res.json({ data: data.rows });
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running at port 3000`);
});
