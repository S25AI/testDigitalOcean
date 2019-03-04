const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {UserModel} = require('../db/models/User');
const {ArticleModel} = require('../db/models/Article');
const {
  findUser,
  saveUser,
  saveArticle,
  findMessages,
  getArticles
} = require('../db/helpers');

const jsonParser = bodyParser.json();

module.exports = (app) => {
  app.post('/api/register', jsonParser, (req, res, next) => {
    let { login, password } = req.body;

    if (login.length < 3 || password.length < 6) {
      return res.status(400).send({
        message: 'login or password not valid',
        status: 400
      });
    }

    findUser(login)
      .then(isLoginAlreadyExist => {
        if (!!isLoginAlreadyExist) {
          res.status(409).send({
            message: 'user already exist',
            status: 409
          });
          return;
        }
        return saveUser(new UserModel({login, password, _id: new mongoose.Types.ObjectId()}))
      })
      .then((response) => {
        if (!response) return;

        res.cookie('login', login, {maxAge: 86400000});
        res.status(200).send({
          message: 'You successfully registered',
          login,
          status: 200
        });
      })
      .catch(err => {
        console.log('in api/register: err is ', err);
        next(err);
      });
  });

  app.post('/api/auth', jsonParser, (req, res, next) => {
    let { login, password } = req.body;

    findUser(login)
      .then(userData => {
        if (!userData || !userData.checkPassword(password)) {
          res.status(400).send({
            message: 'login or password incorrect',
            status: 400
          });
          return;
        }

        res.cookie('login', login, {maxAge: 86400000});
        res.status(200).send({
          message: 'success',
          login,
          status: 200
        });
      })
      .catch(err => {
        console.log('err is ', err);
        next(err);
      });
  });

  app.post('/api/cookieCheck', jsonParser, (req, res, next) => {
    let {login} = req.body;

    findUser(login)
      .then((isUserExist) => {
        res.status(200).send({
          message: isUserExist ? 'authorized': 'notAuthorized',
          login: isUserExist ? login : null, 
          status: 200
        });
      })
      .catch(err => {
        console.log('err is ', err);
        next(err);
      })
  });

  app.get('/api/chatMessages', (req, res, next) => {
    findMessages()
      .then(data => {
        let messages = data.map(({author, body, date}) => ({
          userLogin: author,
          message: body,
          date
        }));
  
        res.status(200).send({
          message: 'success',
          status: 200,
          messages
        });
      })
      .catch(err => {
        console.log('err is ', err);
        res.status(400).send({
          message: 'something being wrong',
          status: 400
        });
      });
  });

  app.get('/api/fetchArticles', (req, res, next) => {
    getArticles()
      .then(data => {
        let promisesArr = [];

        data.forEach((article) => {
          let promise = new Promise((resolve, reject) => {
            ArticleModel
              .findOne({title: article.title})
              .populate('author')
              .exec((err, authorData) => {
                if (err) reject(err);
                resolve({articleData: article, login: authorData.author.login});
              });
          });
          promisesArr = [...promisesArr, promise];
        });

        return Promise.all(promisesArr);
      })
      .then((data) => {
        let messages = data.map(({articleData: {title, descr, body, category, date}, login}) => ({
          title,
          descr,
          body,
          category,
          date,
          login
        }));

        res.status(200).send({
          message: 'success',
          status: 200,
          messages
        });
      })
      .catch(err => {
        console.log('err is ', err);
        next(err);
      })
  });

  app.post('/api/createArticle', jsonParser, (req, res, next) => {
    let {
      title,
      descr,
      body,
      category,
      author
    } = req.body;

    let articleData = {
      title,
      descr,
      body,
      category
    };

    for (let key in articleData) {
      if (!articleData[key]) {
        res.status(400).send({
          message: 'something being wrong',
          status: 400
        });
      }
    }

    findUser(author)
      .then(authorData => {
        updatedArticleData = {...articleData, author: authorData._id};
        return saveArticle(new ArticleModel(updatedArticleData));
      })
      .then(message => {
        res.status(200).send({
          message,
          status: 200
        });
      })
      .catch(err => {
        console.log('err is ', err);
        next(err);
      });
  });
};