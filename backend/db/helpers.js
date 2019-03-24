'use strict';

const {UserModel} = require('./models/User');
const {MessageModel} = require('./models/Message');
const {ArticleModel} = require('./models/Article');

exports.findUser = (username) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({username}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

exports.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    UserModel.findById(id, (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  });
}

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