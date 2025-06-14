-- Table: images
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL
);