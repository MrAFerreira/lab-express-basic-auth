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

router.post('/profile/edit', protectRoute, passUserToViews, deserializeUser, (req, res) => {
  const userId = req.session.userId;
  const { userName } = req.body;
  console.log(userId, { userName });
  User.findByIdAndUpdate(userId, { userName: { userName } }, { runValidators: true });
  res.redirect('/profile');
});

module.exports = router;
