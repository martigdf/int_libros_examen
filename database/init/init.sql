CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    lastname TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'user')) NOT NULL
);

INSERT INTO users (name, lastname, username, email, role, password) VALUES 
    ('Jorge', 'Melnik', 'melnik_1','jorgemelnik@gmail.com', 'admin', crypt('contraseña', gen_salt('bf'))),
    ('Martina', 'Guzmán', 'marti_42', 'martina@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Luis', 'Di Muro', 'luis_89', 'luis@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Lucas', 'Rodriguez', 'luquitas_77', 'lucas@gmail.com', 'user', crypt('contraseña', gen_salt('bf')))
;