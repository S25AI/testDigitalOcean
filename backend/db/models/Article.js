'use strict';

const mongoose = require('mongoose');
const {articleSchema} = require('../schema/Article');

exports.ArticleModel = mongoose.model('Article', articleSchema);