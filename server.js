var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require("./module/user.js");
var cors = require('cors');
var port = 3000;
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/mydatabase');
var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/person', function(req, res) {
  User.find({
    status: req.query.status
  }, function(err, user){
    return res.send(user);
  })
});

app.post('/person', function(req, res) {
  var user = new User(req.body);
  console.log(req.body);
  user.save(function(err, x){
    if (err) {
      return res.status(500).send(err)
    }
    else {
      return res.send(x);
    }
  });
});

app.delete('/person/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    return res.send("so long, and thanks for all the fish");
  });
});

app.put('/person/:id', function(req, res, next){
  User.findByIdAndUpdate(req.params.id, req.body, function(err, resp){
      if(err) {
        return res.status(500).send(err);
      }
      else {
          return res.status(200).send(resp);
      }
  });
});

app.listen(port, function(){
console.log('Beginning your downfall on port 3000...');
});
