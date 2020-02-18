'use strict';

// User model goes here

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userName: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);
