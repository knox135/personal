
var Message = require('../../module/Message.js')

module.exports = {
  create: function(req, res, next) {
    console.log('create', req.body);
    Message.create(req.body, function(err, message) {
      if(err) res.status(500).send(err);
      res.status(200).send(message);
    });
  },
  read: function(req, res, next) {
    Message.find(req.query)
      // .populate('author', "name")
      .exec(function(err, message) {
        if(err) res.status(500).send(err);
        res.status(200).send(message);
      });
  },
  update: function(req, res, next) {
    Message.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, message) {
      if(err) res.status(500).send(err);
      res.status(200).send(message);
    });
  },
  delete: function(req, res, next) {
    Message.findByIdAndRemove(req.params.id, function(err, message) {
      if(err) res.status(500).send(err);
      res.status(200).send(message);
    });
  },
};
