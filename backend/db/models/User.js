'use strict';

const mongoose = require('mongoose');
const {userSchema} = require('../schema/User');

exports.UserModel = mongoose.model('User', userSchema);