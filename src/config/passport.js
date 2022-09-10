const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../api/user/user.model');
const { JWT_SECRET } = require('../config/env-vars');

const JwtOptions = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const JWT = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

exports.Jwt = new Strategy(JwtOptions, JWT);