const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username}).exec();
        console.log('check if user exists');
        if (user) {
            return res.redirect('/signup-failure');
        }
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            try {
                console.log('store hashed password');
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    admin: false,
                    member: false,
                });
                await user.save();
                return res.redirect('/signup-success');
            } catch (e) {
                throw new Error(e);
            }
        });
    } catch (e) {
        throw new Error(e);
    }
})

router.get('/signup-success', (req, res, next) => {
    console.log(req.session.id);
    console.log(req.isAuthenticated());

    res.status(200).json({code: 200, msg: "successfully signed up"});
})

router.get('/signup-failure', (req, res, next) => {
    res.status(401).json({code: 401, msg: 'user with username exists'});
})

module.exports = router;