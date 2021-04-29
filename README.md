<!-- ABOUT THE PROJECT -->
# About The Project


A sample PERN  (fullstack) app to demonstrate Authentication with JWT tokens, BCrypt, React and others. 

This is just a sample I used to learn auth with react and node. I am no auth expert so use at your own risk :D 

### Built with:

BACKEND (Database)
* Postgresql
* node-postgres (pg)


BACKEND (Server)
* NodeJS
* Express ^4 (middleware)
* Nodemon (for hot reloding)
* Bcrypt (for password hashing).
* jsonwebtokens (or JWT) (for authentication purposes)
* cookieparser (parsing cookies middleware)
* CORS (to enable and configure CORS since we are interacting with a front-end client)
* dotenv (for storing sensitive information such as database keys)
* Morgan (loggin middleware)

FRONTEND (Client)
* React (with useState, useEffect hooks)
* React Router (with Protected Route implementation)
* React Redux
* React Thunk (for async actions)  
* Axios (for Http requests)
* Bootstrap 4 

# Before you Install

Prerequisites 
* Have Node installed on your machine
* Have a local Postgres server installed and running 
* (Optional) Have PGAdmin4 installed and ready to run queries. Alternatively can just use the terminal or psql.  

<!-- GETTING STARTED -->
# Installation

First, clone the repo using the command:
```sh
  git clone
  ```

### Set up (free) Postgres locally 

Make sure you have Postgres installed and running locally.
Now, run the sql commands in the sql folder (sql > create_table.sql) to create the tables needed to run the application.


### Create and edit a .env file to store private keys, etc..

You will need to add in the root directory a .env file. Inside this file, you will need to add your secrets keys to access the database and to sign and verify JWT tokens. 

Here's an example of how the .env file can look like: 

``` 
   DB_USER = <put your username here>
   DB_PASSWORD = <put your password here>
   DB_URL = <put the entire MongoDB atlas URL here>

   JWT_SECRET = <put the secret JWT random string here>

   ```
Note: to create a good JWT secret, check the comments in keys.js

### Install all dependencies

Navigate to the project directory and run this command 
```sh
  npm install
  ```

Then, navigate the client folder and run the same command to run all the client's dependencies.  

### Start the server

Navigate to the project directory and run this command 
```sh
  npm start 
  ```  

### Start the server (Node)

Navigate to the Root folder and run this command:
```sh
  npm start
  ```     

### Start the client (React app)

Navigate to the Client folder and run this command 
```sh
  npm start
  ```    


# Todo

* Clean-up unused components and react alerts
* Refactor React code to improve maintainability
* Add inline comments to explain all major steps in the code
* Check resolver functions in the client for error handling (the one in use now works but I think it can be improved / simplified )
* Fix annoying react bug in login route (wrong alert shows up)
* REVIEW the code to check for likely security issues



<!-- LICENSE -->
# License

Distributed under the MIT License. See `LICENSE` for more information.

 




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
