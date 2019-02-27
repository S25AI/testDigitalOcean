'use strict';

const mongoose = require('mongoose');

exports.articleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isModerated: {
    type: Boolean,
    default: false,
    required: true
  }
});