var User = require('../../module/Person');

module.exports = {

  read: function(req, res) {
    User.find(req.query, function(err, use) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(use);
    });
  },

  create: function(req, res) {
    User.create(req.body, function(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(user);
    });
  },

  update: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(use);
    });
  },
  
  delete: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(use);
    });
  }
};
