
--Create a table to store the users' data:
--Should run these sql commands when installing the app

CREATE TABLE users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR (100) NOT NULL,
    name VARCHAR(100)
);



CREATE TABLE favorite_color (
	user_id integer REFERENCES users(id) UNIQUE,
	favorite_color varchar(50)
);




