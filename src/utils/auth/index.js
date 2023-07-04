const passport = require('passport');
const localStrategy = require('./strategies/passportLocal');
const { jwtStrategy, jwtStrategyRecov } = require('./strategies/passportJWT');

passport.use(localStrategy);
passport.use(jwtStrategy);
passport.use('jwtRecovery', jwtStrategyRecov);
