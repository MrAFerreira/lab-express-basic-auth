'use strict';

const protectRoute = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new Error('USER_NOT_AUTHORIZED'));
  }
};

module.exports = protectRoute;
