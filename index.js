const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const morgan = require("morgan");
const keys = require('./config/keys');
const routes = require('./routes/routes')
const jwt = require('jsonwebtoken');
const cors = require("cors");
const cookieParser = require('cookie-parser');


// instance of the express app
const app = express();

// for json 
app.use(express.json());

// parsing cookies
app.use(cookieParser());

// CORS (for security and credentials from the frontend)
// in origin you should put the URL of your frontend (in this case is on port 3000 since this is what react uses by default)
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true // to exchange the cookie to authenticate
  }));

// can change this
const PORT = 8000;


// DATABASE CONFIG
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//connect to MongoDB
mongoose.connect(keys.mongdodb.dbURI, dbOptions, () => {
    console.log('-- connected to DB - Mongo Atlas --')
})

// LOGGING middleware
app.use(morgan("tiny"));

// API ROUTES 
app.use('/api', routes);





app.listen(PORT, () => {
  console.log(`<<< SERVER STARTED on port ${PORT} >>>`);
});




