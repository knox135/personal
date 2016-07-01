var mongoose = require('mongoose');
var Schema = mongoose.Schema;
user = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String, required: true
  },
  accName: {
    type: String, required: true
  },
  email: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  }
});
module.exports = mongoose.model("User", user);
