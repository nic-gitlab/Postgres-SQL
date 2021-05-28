DROP TABLE IF EXISTS adventures;

CREATE TABLE adventures (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location_id INTEGER REFERENCES locations(id)
);

CREATE TABLE locations (
id SERIAL PRIMARY KEY,
location VARCHAR(255) NOT NULL
)