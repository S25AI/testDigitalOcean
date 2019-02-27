'use strict';

const mongoose = require('mongoose');

exports.messageSchema = mongoose.Schema({
  author: String,
  date: { type: Date, default: Date.now },
  body: String
});