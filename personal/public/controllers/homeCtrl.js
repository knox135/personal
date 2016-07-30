angular.module("myApp").controller("homeCtrl", function($scope, messages, messageService) {

  console.log(messages);

  $scope.messages = messages;

  $scope.getMessages = function() {
    messageService.getMessage().then(function(response) {
      $scope.messages = response;
    });
  };

  $scope.createMessage = function(message) {
    messageService.createMessage(message).then(function(response) {
      $scope.getMessages();
    });
  };

  $scope.updateMessage = function(id, updatedMessage) {
    messageService.editMessage(id, updatedMessage).then(function(response) {
      $scope.getMessages();
    });
  };

  $scope.deleteMessage = function(id) {
    messageService.deleteMessage(id).then(function(response) {
      $scope.getMessages();
    });
  };

  setTimeout(function() {
    $scope.getMessages();
  }, 500)
});
