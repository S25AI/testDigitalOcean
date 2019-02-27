'use strict';

const mongoose = require('mongoose');
const {messageSchema} = require('../schema/Message');

exports.MessageModel = mongoose.model('Message', messageSchema);