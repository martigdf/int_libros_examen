CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    lastname TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL
);

INSERT INTO users (name, lastname, email, role, password) VALUES 
    ('Jorge', 'Melnik', 'jorgemelnik@gmail.com', 'admin', crypt('contraseña', gen_salt('bf'))),
    ('Martina', 'Guzmán', 'martina@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Luis', 'Di Muro', 'luis@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Lucas', 'Rodriguez', 'lucas@gmail.com', 'user', crypt('contraseña', gen_salt('bf')))
;