<!-- ABOUT THE PROJECT -->
# About The Project


A sample MERN (fullstack) app to demonstrate Authentication with JWT tokens, BCrypt, React and others. 


### Built with:

BACKEND (Database)
* MongoDB Atlas 
* Mongoose (to write queries and interact with Mongo Atlas in general)


BACKEND (Server)
* NodeJS
* Express ^4 (middleware)
* Bcrypt (for password hashing).
* jsonwebtokens (or JWT) (for authentication purposes)
* cookieparser (parsing cookies middleware)
* CORS (to enable and configure CORS since we are interacting with a front-end client)
* dotenv (for storing sensitive information such as database keys)
* Morgan (loggin middleware)

FRONTEND (Client)
* React (with useState, useEffect hooks)
* React Router (with Protected Route implementation)
* Axios (for Http requests)
* Bootstrap 4 



<!-- GETTING STARTED -->
# Setup

First, clone the repo using the command:
```sh
  git clone
  ```

### Set up (free) MongoDB Atlas 

Since this app is using MongoDB Atlas (Free tier is ok) as a dabatase you will need first so set up an account (if you do not have one) and a database's collection. 


### Create and edit a .env file to store private keys, etc..

You will need to add in the root directory a .env file. Inside this file, you will need to add your secrets keys to access the database and to sign and verify JWT tokens. 

Here's an example of how the .env file can look like: 

``` 
   DB_USER = <put your username here>
   DB_PASSWORD = <put your password here>
   DB_URL = <put the entire MongoDB atlas URL here>

   JWT_SECRET = <put the secret JWT random string here>

   ```

### Run npm install to install dependencies

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

### Start the react app

Navigate to the client folder and run this command 
```sh
  npm start
  ```    


# Todo

* Clean-up unused components and react alerts
* Refactor React code to improve maintainability
* Add inline comments to explain all major steps in the code
* Check resolver functions in the client for error handling (the one in use now works but I think it can be improved / simplified )


<!-- LICENSE -->
# License

Distributed under the MIT License. See `LICENSE` for more information.

 




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
