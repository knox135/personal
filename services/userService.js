angular.module('myApp')
.service('userService', function($http){

  this.getUser = function(){
    return $http({
      method: 'GET',
      url: '/person',
    }).then(function(data) {
      return data.data;
    })
  }

  this.newUser = function(user) {
    $http({
      method: 'POST',
      url: '/person',
      data: user
    })
  },

  this.updateUser = function(user) {
    return $http({
      method: 'PUT',
      url: '/person/' + person._id,
      data: user
    })
  }
  
  this.deleteUser = function(user) {
    return $http({
      method: 'DELETE',
      url: '/person/' + person._id
    })
  }
})
