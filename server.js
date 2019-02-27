'use strict';

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const runMongo = require('./backend/db/connect');
const handleApiRequests = require('./backend/routes');
const PORT = 9002;

const {saveMessage} = require('./backend/db/helpers');
const {MessageModel} = require('./backend/db/models/Message');

runMongo();

app.use(express.static('build'));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
  res.setHeader('Access-Control-Allow-Method', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const WebSocketServer = new require('ws');

let clients = {};

const webSocketServer = new WebSocketServer.Server({port: 8282});

webSocketServer.on('connection', function(ws) {
  let id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);
    let parsedMessage = JSON.parse(message);
    let {userLogin: author, message: body} = parsedMessage;

    saveMessage(new MessageModel({author, body}))
      .then(response => {
        if (response === 'success') {
          for (let key in clients) {
            clients[key].send(JSON.stringify(parsedMessage));
          }
        }
      })
      .catch(console.log);
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });
});

handleApiRequests(app);

app.get('*', (req, res, next) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

app.post('*', (req, res, next) => {
  res.status(404).send('Page not found!');
});

app.use((err, req, res, next) => {
  console.log('we are here ', err);
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});