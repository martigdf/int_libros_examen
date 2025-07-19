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

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    author TEXT NOT NULL,
    state VARCHAR(10) CHECK (
        state IN (
            'available',
            'requested',
            'reserved',
            'loaned',
            'returned',
            'cancelled',
            'unavailable'
        )
    ) NOT NULL
);

CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP DEFAULT NOW() NOT NULL,
    location TEXT NOT NULL,
    id_user INTEGER REFERENCES users(id),
    id_book INTEGER REFERENCES books(id)
);

CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- Agregamos esta tabla para que exista una relacion N:M correcta
CREATE TABLE IF NOT EXISTS books_genres (
    id_book INTEGER REFERENCES books(id),
    id_genre INTEGER REFERENCES genres(id),
    PRIMARY KEY (id_book, id_genre)
);

CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    creation_date TIMESTAMP DEFAULT NOW() NOT NULL,
    state VARCHAR(20) CHECK (
        state IN (
            'pending',
            'accepted',
            'rejected', 
            'cancelled'
        )
    ) NOT NULL,
    id_user_applicant INTEGER REFERENCES users(id),
    id_user INTEGER REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS requests_books (
    id_request INTEGER REFERENCES requests(id),
    id_book INTEGER REFERENCES books(id),
    PRIMARY KEY (id_request, id_book)
);

CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    date_loan TIMESTAMP DEFAULT NOW() NOT NULL,
    id_request INTEGER REFERENCES requests(id)
);

CREATE TABLE IF NOT EXISTS devolutions (
    id_loan INTEGER PRIMARY KEY REFERENCES loans(id),
    opinion TEXT NOT NULL,
    calification INTEGER CHECK (calification BETWEEN 1 AND 5)
);

INSERT INTO users (name, lastname, username, email, role, password) VALUES 
    ('Jorge', 'Melnik', 'melnik_1','jorgemelnik@gmail.com', 'admin', crypt('contraseña', gen_salt('bf'))),
    ('Martina', 'Guzmán', 'marti_42', 'martina@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Luis', 'Di Muro', 'luis_89', 'luis@gmail.com', 'user', crypt('contraseña', gen_salt('bf'))),
    ('Lucas', 'Rodriguez', 'luquitas_77', 'lucas@gmail.com', 'user', crypt('contraseña', gen_salt('bf')))
;

INSERT INTO books (name, author, state) VALUES
  ('1984', 'George Orwell', 'available'),
  ('The Hobbit', 'J.R.R. Tolkien', 'available'),
  ('Dune', 'Frank Herbert', 'available'),
  ('El Principito', 'Antoine de Saint-Exupéry', 'available');

INSERT INTO genres (name) VALUES
  ('Science Fiction'),
  ('Fantasy'),
  ('Classic'),
  ('Children');