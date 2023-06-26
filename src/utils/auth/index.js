const passport = require('passport');
const localStrategy = require('./strategies/passportLocal');
const jwtStrategy = require('./strategies/passportJWT');

passport.use(localStrategy);
passport.use(jwtStrategy);
