// Get our dependencies
const express = require("express");
const app = express();
const mysql = require("mysql2");
const util = require("util");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "movie_db",
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.query = util.promisify(pool.query);

// Implement the movies API endpoint
app.get("/movies", async function (req, res) {
  try {
    const rows = await pool.query(
      "select m.title, m.release_year, m.score, r.name as reviewer, p.name as publication from movies m," +
        "reviewers r, publications p where r.publication=p.name and m.reviewer=r.name"
    );
    res.json(rows);
  } catch (err) {
    console.error("API Error:", err);
    res.staus(500).send({ msg: "Internal server error" });
  }
});

app.get("/reviewers", async function (req, res) {
  try {
    const rows = await pool.query(
      "select r.name, r.publication, r.avatar from reviewers r"
    );
    res.json(rows);
  } catch (err) {
    console.error("API Error:", err);
    res.staus(500).send({ msg: "Internal server error" });
  }
});

app.get("/publications", async function (req, res) {
  try {
    const rows = await pool.query(
      "select r.name, r.publication, r.avatar from reviewers r"
    );
    res.json(rows);
  } catch (err) {
    console.error("API Error:", err);
    res.staus(500).send({ msg: "Internal server error" });
  }
});

app.get("/pending", async function (req, res) {
  try {
    const rows = await pool.query(
      "select m.title, m.release_year, m.score, r.name as reviewer, p.name as publication" +
        "from movie_db.movies m, movie_db.reviewers r, movie_db.publications p where" +
        "r.publication=p.name and m.reviewer=r.name and m.release_year>=2017"
    );
    res.json(rows);
  } catch (err) {
    console.error("API Error:", err);
    res.staus(500).send({ msg: "Internal server error" });
  }
});

app.get("/", function (req, res) {
  res.status(200).send({ service_status: "Up" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API listening on port: ${port}`);
});
module.exports = app;
