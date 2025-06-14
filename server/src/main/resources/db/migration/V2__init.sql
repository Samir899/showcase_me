CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT,
    role_id INT NOT NULL REFERENCES roles(role_id),
    is_active BOOLEAN
);
