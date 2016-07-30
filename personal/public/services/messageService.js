angular.module("myApp")
.service("messageService", function($http) {

  this.getMessage = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/message' + query
    }).then(function(response) {
      return response.data;
    });
  };

  this.createMessage = function(message) {
    return $http({
      method: 'POST',
      url: '/message',
      data: message
    }).then(function(response) {
      return response;
    });
  };

  this.editMessage = function(id, message) {
    return $http({
      method: 'PUT',
      url: "/message/" + id,
      data: message
    }).then(function(response) {
      return response;
    });
  };
  
  this.deleteMessage = function(id) {
    return $http({
      method: 'DELETE',
      url: '/message/' + id
    }).then(function(response) {
      return response;
    });
  };

});
