const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const user = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET || 'secretKey',
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const userData = await user.getByUsername(jwtPayload.username);
        return done(null, userData);
      } catch (err) {
        return done(null, false);
      }
    }),
  );
};
