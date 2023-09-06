-- creating database
CREATE DATABASE voter_registration;

-- \c into voter_registration

-- creating table
CREATE TABLE data(
  voter_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  vote_choice BOOLEAN,
  date DATE
);