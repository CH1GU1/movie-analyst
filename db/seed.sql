INSERT INTO publications (name, avatar) VALUES
  ('The Daily Reviewer', 'glyphicon-eye-open'),
  ('International Movie Critic', 'glyphicon-fire'),
  ('MoviesNow', 'glyphicon-time'),
  ('MyNextReview', 'glyphicon-record'),
  ('Movies n'' Games', 'glyphicon-heart-empty'),
  ('TheOne', 'glyphicon-globe'),
  ('ComicBookHero.com', 'glyphicon-flash');

INSERT INTO reviewers (name, publication, avatar) VALUES
  ('Robert Smith', 'The Daily Reviewer', 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg'),
  ('Chris Harris', 'International Movie Critic', 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg'),
  ('Janet Garcia', 'MoviesNow', 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg'),
  ('Andrew West', 'MyNextReview', 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg'),
  ('Mindy Lee', 'Movies n'' Games', 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg'),
  ('Martin Thomas', 'TheOne', 'https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg'),
  ('Anthony Miller', 'ComicBookHero.com', 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg');

INSERT INTO movies (title, release_year, score, reviewer, publication) VALUES
  ('Suicide Squad', '2016', 8, 'Robert Smith', 'The Daily Reviewer'),
  ('Batman vs. Superman', '2016', 6, 'Chris Harris', 'International Movie Critic'),
  ('Captain America: Civil War', '2016', 9, 'Janet Garcia', 'MoviesNow'),
  ('Deadpool', '2016', 9, 'Andrew West', 'MyNextReview'),
  ('Avengers: Age of Ultron', '2015', 7, 'Mindy Lee', 'Movies n'' Games'),
  ('Ant-Man', '2015', 8, 'Martin Thomas', 'TheOne'),
  ('Guardians of the Galaxy', '2014', 10, 'Anthony Miller', 'ComicBookHero.com'),
  ('Doctor Strange', '2016', 7, 'Anthony Miller', 'ComicBookHero.com'),
  ('Superman: Homecoming', '2017', 10, 'Chris Harris', 'International Movie Critic'),
  ('Wonder Woman', '2017', 8, 'Martin Thomas', 'TheOne');