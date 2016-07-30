angular.module('myApp')
.controller('settingsController', function($scope, userService, $state){
  $scope.updateUser = function() {
    userService.getUser().then(function(data){
      $state.editUserForm = false;
      console.log(response);
      $state.go('settings.edit', {}, {reload: true});
  }

  $scope.deleteUser = function(productId) {
    userService.deleteUser(userId).then(function(resp){
      $scope.editMode = false;
      $state.go('settings', {}, {reload: true});
    })
  }
})
