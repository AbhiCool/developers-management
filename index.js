

// Require external modules
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Set portNo
const portNo = process.env.portNo;

// Import needed routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// Import db setup
const dbSetup = require('./db/db-setup');

dbSetup();

// Create express app
const app = express();

// Setup express session middleware
app.use(session({
    secret: process.env.sessionSecret,
    resave: true,
    saveUninitialized: true
}))

// Set default engine
app.set('view engine', 'ejs');

// Setup bodyParser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes of app for authentication
app.use("/", authRouter);
app.use("/", userRouter);

app.listen(portNo, ()=> {
    console.log(`Server started at ${portNo}`);
});