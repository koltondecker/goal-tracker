DROP DATABASE IF EXISTS progress_tracker;

CREATE DATABASE progress_tracker;

USE progress_tracker;

CREATE TABLE users(
  id INTEGER NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE goals(
  id INTEGER NOT NULL AUTO_INCREMENT,
  -- userId INTEGER NOT NULL,
  goalName VARCHAR(200) NOT NULL,
  goalNumber INT NOT NULL,
  doBy DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userid) REFERENCES users (id)
);

CREATE TABLE milestones(
  id INTEGER NOT NULL AUTO_INCREMENT,
  goalId INTEGER NOT NULL,
  numberDone INT NOT NULL,
  doneBy DATE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (goalid) REFERENCES goals (id)
);

INSERT INTO users (email, password)
VALUES ('steve@gmail.com', 'xxxxxx');

INSERT INTO users (email, password)
VALUES ('carly@gmail.com', 'xxxxxx');

INSERT INTO goals (userId, goalName, goalNumber, doBy)
VALUES ('1', 'situps', 500, '2021-3-22');

INSERT INTO goals (userId, goalName, goalNumber, doBy)
VALUES ('2', 'homes toured', 10, '2021-4-01');

INSERT INTO goals (userId, goalName, goalNumber, doBy)
VALUES ('1', 'apples', 7, '2021-3-22');

INSERT INTO milestones (goalId, numberDone, doneBy)
VALUES ('2', 3, '2021-3-27');

INSERT INTO milestones (goalId, numberDone, doneBy)
VALUES ('3', 3, '2021-3-17');

INSERT INTO milestones (goalId, numberDone, doneBy)
VALUES ('3', 1, '2021-3-18');

INSERT INTO milestones (goalId, numberDone, doneBy)
VALUES ('1', 50, '2021-3-27');

INSERT INTO milestones (goalId, numberDone, doneBy)
VALUES ('1', 50, '2021-4-01');

SELECT * FROM users
LEFT JOIN goals ON userId = users.id
LEFT JOIN milestones ON goalId = goals.id;

SELECT users.id, userId, email, goalName, goalNumber, sum(numberDone) AS completed, goalNumber-sum(numberDone) AS remaining
FROM milestones
INNER JOIN goals on goals.id = goalId
INNER JOIN users on users.id = userId
GROUP BY goals.id