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
    description TEXT NOT NULL,
    state VARCHAR(10) CHECK (
        state IN (
            'available',
            'unavailable'
        )
    ) NOT NULL,
    creation_date TIMESTAMP DEFAULT NOW() NOT NULL,
    location TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id)
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
            'declined', 
            'cancelled'
        )
    ) NOT NULL,
    sender_user_id INTEGER REFERENCES users(id),
    receiver_user_id INTEGER REFERENCES users(id)
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

INSERT INTO books (name, author, description, state, creation_date, location, owner_id) VALUES
  ('1984', 'George Orwell', 'Este libro se encuentra con ausencia de paginas', 'available', CURRENT_TIMESTAMP, 'Localización 1', 1),
  ('The Hobbit', 'J.R.R. Tolkien', 'Esta en delicadas condiciones tratar bien', 'available', CURRENT_TIMESTAMP, 'Localización 1', 1),
  ('Dune', 'Frank Herbert', 'Debe ser tratado con amor', 'available', CURRENT_TIMESTAMP, 'Localización 1', 1),
  ('El Principito', 'Antoine de Saint-Exupéry', 'Es para una lectura rapida pero sabia', 'available', CURRENT_TIMESTAMP, 'Localización 1', 1);

INSERT INTO genres (name) VALUES
  ('Science Fiction'),
  ('Fantasy'),
  ('Classic'),
  ('Children');

  INSERT INTO requests (creation_date, state, sender_user_id, receiver_user_id) VALUES
  (CURRENT_TIMESTAMP, 'pending', 3, 1),   -- Luis → Jorge
  (CURRENT_TIMESTAMP, 'accepted', 2, 1),  -- Martina → Jorge
  (CURRENT_TIMESTAMP, 'declined', 4, 1),   -- Lucas → Jorge
  (CURRENT_TIMESTAMP, 'pending', 1, 2),   -- Jorge → Martina
  (CURRENT_TIMESTAMP, 'accepted', 3, 2),  -- Luis → Martina
  (CURRENT_TIMESTAMP, 'declined', 4, 2);  -- Lucas → Martina

  
INSERT INTO requests_books (id_request, id_book) VALUES
    (1, 1), -- Luis solicita 1984
    (2, 2), -- Martina solicita The Hobbit
    (3, 3), -- Lucas solicita Dune
    (4, 4), -- Jorge solicita El Principito
    (5, 1), -- Luis solicita 1984 a Martina
    (6, 2); -- Lucas solicita The Hobbit a Martina