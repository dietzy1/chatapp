CREATE TABLE
  users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    icon_id INTEGER NOT NULL REFERENCES icons (icon_id) ON DELETE CASCADE,
    join_date DATE NOT NULL,
    verified BOOLEAN NOT NULL
  );

CREATE TABLE
  icons (
    icon_id SERIAL PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    kind VARCHAR(255) NOT NULL
  );