'use strict';

const mongoose = require('mongoose');
const config = require('../config');

module.exports = () => {
  mongoose.connect(config.db)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.error(err)); 
};