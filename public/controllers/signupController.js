angular.module('myApp')
.controller('signupController', function($scope, userService, $state){
  $scope.newUser = function(user){
  userService.newUser(user);
  $scope.showNewUser = false;
  $scope.user = {};
  }

 



})
