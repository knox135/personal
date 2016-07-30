// 
// var express = require('express');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var mongoose = require('mongoose');
//
//
// var app = express();
// app.use(bodyParser());
// app.use(cors());
// app.use(express.static(__dirname + './../public'));
//
//
// var messageCtrl = require('./controllers/messageController.js');
// var userCtrl = require('./controllers/userController.js');
//
// app.get('/message', messageCtrl.read);
//
// app.post('/message', messageCtrl.create);
// app.put('/message/:id', messageCtrl.update);
// app.delete('/message/:id', messageCtrl.delete);
//
//
// app.get('/user', userCtrl.read);
// app.post('/user', userCtrl.create);
// app.put('/user/:id', userCtrl.update);
// app.delete('user/:id', userCtrl.delete);
//
//
// var mongoURI = 'mongodb://localhost:27017/messager';
//
// // DATABASE CONNECTION
// mongoose.set('debug', true);
// mongoose.connect(mongoURI);
// mongoose.connection.once('open', function() {
//   console.log('Connected to mongo at: ', mongoURI);
// });
//
//
// app.listen(port, function() {
//   console.log('Connected on port', port);
// });
