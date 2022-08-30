

// Require external modules
const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
require('dotenv').config();

// Set portNo
const portNo = process.env.PORT || process.env.portNo;

// Import needed routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');


const {checkIfDeleteMethodIsAllowed, checkIfAdmin} = require("./utils/customMiddlewares");


// Import db setup
const dbSetup = require('./db/db-setup');

dbSetup();

// Create express app
const app = express();

// Get pgPool
const pgPool = require('./db/pgPool');

// Setup express session middleware
app.use(session({
    store: new pgSession({
        pool: pgPool
    }),
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }));

// Set default engine
app.set('view engine', 'ejs');

// Setup bodyParser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// delete method not allowed for non admin users
app.delete(checkIfDeleteMethodIsAllowed);


// Routes of app for authentication
app.use("/", authRouter);

// Routes related to user
app.use("/", userRouter);

// Routes related to admin
app.use("/admin", checkIfAdmin, adminRouter);


app.listen(portNo, () => {
    console.log(`Server started at ${portNo}`);
});