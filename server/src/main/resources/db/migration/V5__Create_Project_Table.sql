-- Table: projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    overview TEXT
);