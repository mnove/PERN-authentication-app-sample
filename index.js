const express = require('express');
require("dotenv").config();
const morgan = require("morgan");
const Pool = require("pg").Pool;
const keys = require('./config/keys');
const routes = require('./routes/routes')
const jwt = require('jsonwebtoken');
const cors = require("cors");
const cookieParser = require('cookie-parser');


// Database Pool (to connect to Postgresql)
const pool = new Pool(keys.postgresDb);


// instance of the express app
const app = express();

// for json 
app.use(express.json());

// parsing cookies
app.use(cookieParser());

// LOGGING middleware
app.use(morgan("tiny"));

// CORS (for security and credentials from the frontend)
// in origin you should put the URL of your frontend (in this case is on port 3000 since this is what react uses by default)
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true // to exchange the cookie to authenticate
  }));

// can change this
const PORT = 8000;




// API ROUTES 
app.use('/api', routes);

//TODO FUTURE IMPLEMENTATIONS of Routes
// app.use('/api', registration);
// app.use('/api', login);
// app.use('/api', users);


app.listen(PORT, () => {
  console.log(`<<< SERVER STARTED on port ${PORT} >>>`);
});




