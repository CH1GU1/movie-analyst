const mysql = require("mysql2");
const util = require("util");

async function main() {
  try {
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

    // Create tables if they don't exist
    console.log("Creating tables...");

    // Create publications table
    const createPublicationsTable = `
      CREATE TABLE IF NOT EXISTS publications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        avatar VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createPublicationsTable);

    // Create reviewers table
    const createReviewersTable = `
      CREATE TABLE IF NOT EXISTS reviewers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        publication VARCHAR(255) NOT NULL,
        avatar VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createReviewersTable);

    // Create movies table
    const createMoviesTable = `
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        release_year VARCHAR(4) NOT NULL,
        score INT NOT NULL,
        reviewer VARCHAR(255) NOT NULL,
        publication VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createMoviesTable);

    console.log("Tables created successfully");

    // Clear existing data (optional - remove if you want to preserve existing data)
    console.log("Clearing existing data...");
    await pool.query("DELETE FROM movies");
    await pool.query("DELETE FROM reviewers");
    await pool.query("DELETE FROM publications");

    // Reset auto-increment counters (optional)
    await pool.query("ALTER TABLE movies AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE reviewers AUTO_INCREMENT = 1");
    await pool.query("ALTER TABLE publications AUTO_INCREMENT = 1");

    // Insert publications data
    console.log("Seeding publications...");
    const publicationsQuery =
      "INSERT INTO publications (name, avatar) VALUES ?";
    const publicationsValues = [
      ["The Daily Reviewer", "glyphicon-eye-open"],
      ["International Movie Critic", "glyphicon-fire"],
      ["MoviesNow", "glyphicon-time"],
      ["MyNextReview", "glyphicon-record"],
      ["Movies n' Games", "glyphicon-heart-empty"],
      ["TheOne", "glyphicon-globe"],
      ["ComicBookHero.com", "glyphicon-flash"],
    ];
    await pool.query(publicationsQuery, [publicationsValues]);

    // Insert reviewers data
    console.log("Seeding reviewers...");
    const reviewersQuery =
      "INSERT INTO reviewers (name, publication, avatar) VALUES ?";
    const reviewersValues = [
      [
        "Robert Smith",
        "The Daily Reviewer",
        "https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg",
      ],
      [
        "Chris Harris",
        "International Movie Critic",
        "https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg",
      ],
      [
        "Janet Garcia",
        "MoviesNow",
        "https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg",
      ],
      [
        "Andrew West",
        "MyNextReview",
        "https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg",
      ],
      [
        "Mindy Lee",
        "Movies n' Games",
        "https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg",
      ],
      [
        "Martin Thomas",
        "TheOne",
        "https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg",
      ],
      [
        "Anthony Miller",
        "ComicBookHero.com",
        "https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg",
      ],
    ];
    await pool.query(reviewersQuery, [reviewersValues]);

    // Insert movies data
    console.log("Seeding movies...");
    const moviesQuery =
      "INSERT INTO movies (title, release_year, score, reviewer, publication) VALUES ?";
    const moviesValues = [
      ["Suicide Squad", "2016", 8, "Robert Smith", "The Daily Reviewer"],
      [
        "Batman vs. Superman",
        "2016",
        6,
        "Chris Harris",
        "International Movie Critic",
      ],
      ["Captain America: Civil War", "2016", 9, "Janet Garcia", "MoviesNow"],
      ["Deadpool", "2016", 9, "Andrew West", "MyNextReview"],
      ["Avengers: Age of Ultron", "2015", 7, "Mindy Lee", "Movies n' Games"],
      ["Ant-Man", "2015", 8, "Martin Thomas", "TheOne"],
      [
        "Guardians of the Galaxy",
        "2014",
        10,
        "Anthony Miller",
        "ComicBookHero.com",
      ],
      ["Doctor Strange", "2016", 7, "Anthony Miller", "ComicBookHero.com"],
      [
        "Superman: Homecoming",
        "2017",
        10,
        "Chris Harris",
        "International Movie Critic",
      ],
      ["Wonder Woman", "2017", 8, "Martin Thomas", "TheOne"],
    ];
    await pool.query(moviesQuery, [moviesValues]);

    console.log("Seeds successfully executed");

    // Close the pool
    pool.end();
    process.exit(0);
  } catch (err) {
    console.error("Seeds file error:", err);
    process.exit(1);
  }
}

main();
