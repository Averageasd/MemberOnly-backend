const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

router.get('/login', (req, res, next) => {
    res.status(200).json({msg: 'Go to login page'});
})
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success'
}));

router.get('/login-success', (req, res, next) => {
    res.status(200).json({user: req.user, status: 200, msg: "successfully logged in"});
})

router.get('/login-failure', (req, res, next) => {
    res.status(401).json({user: null, status: 401, msg: "Invalid password or username"});
})

module.exports = router;