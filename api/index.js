require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const index = express();

index.use(cors({
    origin: ['https://member-only-backend.vercel.app/'],
    methods:['POST', 'GET'],
    credentials: true,
}));

const signupRoute = require('../routes/signup');
const loginRoute = require('../routes/login');
const logoutRoute = require('../routes/logout');
const messageRoute = require('../routes/message');
const memberRoute = require('../routes/member');


index.use(express.json());
index.use(express.urlencoded({extended: false}));

async function main() {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
}

main().catch((err) => console.log(err));


index.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
    }
}));

require('../config/passportConfig');

// work on every route
index.use(passport.initialize());
index.use(passport.session());

index.use((req, res, next) => {
    next();
});


index.use('/', signupRoute);
index.use('/', loginRoute);
index.use('/', logoutRoute);
index.use('/', messageRoute);
index.use('/', memberRoute);

index.listen(3000, '0.0.0.0',function () {
    console.log('Listening on port 3000');
});