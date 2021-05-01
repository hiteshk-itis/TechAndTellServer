const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../ models/userModel');
const validatePassword = require('../Authentication/password').validatePassword;

const Strategy = new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username})
        .then((err, user) => {
            if (!user) return done(err, false);
            else if(user){
                const passwd = validatePassword(password, user.salt, user.hash);
                if(passwd)
                    return done(null, user);
                else
                    return done(null, false);
            }
            else{
                return done(err, null)
            }
            
        })
        .catch((err) => done(err));
    }
);

passport.use(Strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
});
passport.deserializeUser((userId, done) => {
    User.findById(userId) 
    .then((user) => {
        done(null, user);
    })
    .catch((err) => done(err));
})

