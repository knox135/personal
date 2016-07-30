var mongoose = require('mongoose');
var user = require('./user.js');
var Schema = mongoose.Schema;

var Message = new Schema({
  author: {
    type: String,
    required: true,
    // type: Schema.Types.ObjectId,
    // ref:'userSchema'
  },
  body: {
    type: String
  },
  created: {
    type: Date,
    default: new Date(),
    // default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('messages', Message);
