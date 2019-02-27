'use strict';

const mongoose = require('mongoose');

exports.userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: {
    type: String,
    unique: true
  },
  password: String
});