'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');

const protectRoute = require('./../middleware/protectRoute');
const passUserToViews = require('./../middleware/pass-user-to-views');
const deserializeUser = require('./../middleware/deserialize-user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/main', protectRoute, (req, res, next) => {
  res.render('main');
});

router.get('/private', protectRoute, (req, res, next) => {
  res.render('private');
});

router.get('/profile', protectRoute, passUserToViews, (req, res, next) => {
  res.render('profile');
});

router.get('/profile/edit', protectRoute, passUserToViews, (req, res, next) => {
  res.render('edit');
});

router.post('/profile/edit', protectRoute, passUserToViews, deserializeUser, (req, res, next) => {
  const userId = req.user._id;
  const { userName } = req.body;
  console.log(userId, { userName });
  User.findByIdAndUpdate(userId, { userName })
    .then(() => {
      res.redirect('/profile');
    })
    .catch(error => {
      next(error);
    });

  /*   User.findById(userId)
    .then(user => {
      console.log(user);
      user.updateOne({ userName });
      res.redirect('/profile');
    })
    .catch(error => next(error)); */
  //(userId, { $set: { userName: userName } }, { runValidators: true });
});

module.exports = router;
