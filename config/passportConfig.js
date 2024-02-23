const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');

const verifyCredentials = async (username, password, done) => {
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return done(null, false)
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false)
        }
        return done(null, user);
    } catch (e) {
        return done(e);
    }
}

passport.use(new LocalStrategy(verifyCredentials));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('call deserializeUser');
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (e) {
        done(e);
    }
});