ALTER TABLE users
ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE users
ADD COLUMN updated_at TIMESTAMP;
