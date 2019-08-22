CREATE TABLE users (
  id UUID PRIMARY KEY,
  user_name VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(30) NULL,
  privilege_level INT NOT NULL
);

CREATE TABLE events (
  id UUID PRIMARY KEY,
  event_name VARCHAR(50) NOT NULL,
  category VARCHAR(30) NOT NULL,
  event_info TEXT NOT NULL,
  event_date DATE NOT NULL,
  organizer_id UUID,
  cost FLOAT NULL,
  FOREIGN KEY (organizer_id) REFERENCES users (id)
);


CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (event_id) REFERENCES events (id)
);
