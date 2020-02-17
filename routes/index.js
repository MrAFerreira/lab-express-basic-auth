'use strict';

const { Router } = require('express');
const router = Router();

const protectRoute = require('./../middleware/protectRoute');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/main', protectRoute, (req, res, next) => {
  res.render('main');
});

router.get('/private', protectRoute, (req, res, next) => {
  res.render('private');
});

module.exports = router;
