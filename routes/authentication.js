'use strict';

const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');

const User = require('./../models/user');

// --------------Sign In

router.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const { name, password } = req.body;

  let user;

  User.findOne({ name })
    .then(document => {
      if (!document) {
        next(new Error('USER_NOT_FOUND'));
      } else {
        user = document;
        console.log(document);
        return bcryptjs.compare(password, document.passwordHash);
      }
    })
    .then(match => {
      if (match) {
        req.session.userId = user._id;
        console.log(user._id);
        res.redirect('/');
      } else {
        next(new Error('USER_PASSWORD_WRONG'));
      }
    })
    .catch(error => {
      next(error);
    });
});

// ---------------------------- Sign Up

router.get('/sign-up', (req, res) => {
  res.render('authentication/sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { password, name } = req.body;

  bcryptjs
    .hash(password, 10)
    .then(hashPlusSalt => {
      return User.create({
        name,
        passwordHash: hashPlusSalt
      });
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
