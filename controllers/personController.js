angular.module('myApp')
.controller('userController', function($scope, products){
  $scope.user = user;
})

module.exports = {
  login: function(req, res, next) {
    var userFound = false;
    users.forEach(function(user) {
      if (req.body.name === user.accountName && req.body.password === user.password) {
        req.session.currentUser = user;
        userFound = true;
      }
    })
    res.send({userFound: userFound});
  },
}
