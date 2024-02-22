require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const messageRoute = require('./routes/message');
const memberRoute = require('./routes/member');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

async function main() {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
}

main().catch((err) => console.log(err));


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day
    }
}));

require('./config/passportConfig');

// work on every route
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    next();
});


app.use('/', signupRoute);
app.use('/', loginRoute);
app.use('/', logoutRoute);
app.use('/', messageRoute);
app.use('/', memberRoute);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});