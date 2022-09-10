const passport = require('passport');
const httpStatus = require('http-status');

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (error || !user) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Unauthorized'
    });
  }
  req.user = user;
  return next();
};

exports.Authorize = () => (req, res, next) => passport.authenticate('jwt',
{ session: false },
handleJWT(req, res, next))(req, res, next);