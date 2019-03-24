const mongoose = require('mongoose');
const {UserModel} = require('../db/models/User');
const passport = require('passport');
const auth = require('./auth');
const {ArticleModel} = require('../db/models/Article');

const {
  findUser,
  findUserById,
  saveArticle,
  findMessages,
  getArticles
} = require('../db/helpers');

module.exports = (app) => {
  app.post('/api/register', auth.optional, (req, res, next) => {
    const {username, password} = req.body;

    if (!username) {
      return res.status(422).json({message: 'username is required'});
    }

    if (!password) {
      return res.status(422).json({message: 'password is required'});
    }

    const finalUser = new UserModel({
      username,
      password,
      _id: new mongoose.Types.ObjectId()
    });

    finalUser.setPassword(password);

    return finalUser.save()
      .then(() => {
        return res.json(finalUser.toAuthJSON());
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(422).json({message: err.message});
        } else if (err.name === 'MongoError') {
          return res.status(422).json({message: err.errmsg});
        } else {
          next(err);
       }});
  });

  app.post('/api/auth', auth.optional, (req, res, next) => {
    const {username, password} = req.body;
  
    if (!username) {
      return res.status(422).json({message: 'username is required'});
    }

    if (!password) {
      return res.status(422).json({message: 'password is required'});
    }
  
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if (err) {
        return next(err);
      }
  
      if (passportUser) {
        const finalUser = passportUser;
        finalUser.token = passportUser.generateJWT();
  
        return res.json(finalUser.toAuthJSON());
      }

      return res.status(400).json({message: info});
    })(req, res, next);
  });

  app.post('/api/userAuthCheck', auth.optional, (req, res, next) => {
    let {userId} = req.body;

    findUserById(userId)
      .then((userInfo) => {
        let login = userInfo.username;

        if (login) {
          res.json({login, status: 200});
        } else {
          res.status(400).json({
            message: 'notAuthorized',
            login: null,
            status: 400
          });
        }
      })
      .catch(err => {
        console.log('err is ', err);
        next(err);
      })
  });

  app.get('/api/chatMessages', auth.required, (req, res, next) => {
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
                console.log('authorData is ', authorData);
                resolve({articleData: article, login: authorData.author.username});
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

  app.post('/api/createArticle', auth.required, (req, res, next) => {
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