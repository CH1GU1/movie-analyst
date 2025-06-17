-- Publications table
CREATE TABLE IF NOT EXISTS publications (
  name VARCHAR(255) PRIMARY KEY,
  avatar VARCHAR(255)
);

-- Reviewers table
CREATE TABLE IF NOT EXISTS reviewers (
  name VARCHAR(255) PRIMARY KEY,
  avatar VARCHAR(255),
  publication VARCHAR(255),
  FOREIGN KEY (publication) REFERENCES publications(name)
);

-- Movies table
CREATE TABLE IF NOT EXISTS movies (
  title VARCHAR(255) PRIMARY KEY,
  release_year VARCHAR(255),
  score INT,
  reviewer VARCHAR(255),
  publication VARCHAR(255),
  FOREIGN KEY (reviewer) REFERENCES reviewers(name),
  FOREIGN KEY (publication) REFERENCES publications(name)
);
