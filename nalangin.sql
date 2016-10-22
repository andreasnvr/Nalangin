DROP DATABASE IF EXISTS nalangin;
CREATE DATABASE nalangin;

\c nalangin;

CREATE TABLE user (
  ID BIGSERIAL PRIMARY KEY,
  name VARCHAR,
  age INTEGER,
  sex VARCHAR
);

INSERT INTO user (name, age, sex)
  VALUES ('Elvira', 23, 'F');