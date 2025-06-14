-- Table: tools
CREATE TABLE tools (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL
);