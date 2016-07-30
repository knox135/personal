var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = require("./module/user.js");
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
config = require('./config.json');
var corsOptions = {
  origin: 'http://localhost:3000'
};
var port = 3000;

mongoose.connect('mongodb://localhost/mydatabase');
var db = mongoose.connection;
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/game'));
app.use(express.static(__dirname + '/public/gamepractice'));

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
var messageCtrl = require('./public/controllers/messageController.js');
var userCtrl = require('./public/controllers/userController.js');

app.get('/message', messageCtrl.read);

app.post('/message', messageCtrl.create);
app.put('/message/:id', messageCtrl.update);
app.delete('/message/:id', messageCtrl.delete);


app.get('/user', userCtrl.read);
app.post('/user', userCtrl.create);
app.put('/user/:id', userCtrl.update);
app.delete('user/:id', userCtrl.delete);

var mongoURI = 'mongodb://localhost:27017/message';


mongoose.set('debug', true);
mongoose.connection.once('open', function() {
  console.log('Connected to mongo at: ', mongoURI);
});

app.listen(port, function(){
console.log('Beginning your downfall on port 3000...');
});
