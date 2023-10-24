CREATE TABLE applications (
  application_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  certificate_uuid UUID NOT NULL,
  UNIQUE (name, address)
);