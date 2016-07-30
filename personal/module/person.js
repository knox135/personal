
var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('person', personSchema);
