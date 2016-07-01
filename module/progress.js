var mongoose = require('mongoose');
var schema = mongoose.Schema;
progress = new Schema ({
  name: {
    type: mongoose.Schema.types.ObjectId,
    required: true,
    ref: 'user'
  },
  level: {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  }
})
