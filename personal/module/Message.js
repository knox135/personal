var mongoose = require('mongoose');
var user = require('./person.js');
var Schema = mongoose.Schema;

var Message = new Schema({
  author: {
    required: true,
    // type: Schema.Types.ObjectId,
    type: String,
    // ref:'personSchema'
  },
  body: {
    type: String
  },
  created: {
    type: Date,
    default: new Date(),
    required: true
  }
});

module.exports = mongoose.model('messages', Message);
