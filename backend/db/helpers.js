'use strict';

const {UserModel} = require('./models/User');
const {MessageModel} = require('./models/Message');
const {ArticleModel} = require('./models/Article');

exports.findUser = (login) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({login}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

exports.saveUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};

exports.saveMessage = (message) => {
  return new Promise((resolve, reject) => {
    message.save((err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};

exports.saveArticle = (article) => {
  return new Promise((resolve, reject) => {
    article.save((err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};

exports.findMessages = () => {
  return new Promise((resolve, reject) => {
    MessageModel.find({}, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

exports.getArticles = () => {
  return new Promise((resolve, reject) => {
    ArticleModel.find({}, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};