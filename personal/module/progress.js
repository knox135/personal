var mongoose = require('mongoose');
var schema = mongoose.Schema;
progress = new Schema ({
  name: {
    type: Schema.types.ObjectId,
    required: true,
    ref: 'user'
  },
  level: {
    postedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  }
})
