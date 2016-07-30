var myApp = angular.module('myApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    templateUrl:'/views/home-tmpl.html',
    url: '/',
  })
  .state('login', {
    url: '/login',
    templateUrl: '/views/login-tmpl.html',
    controller: 'loginController'
  })

  .state('signup', {
    url:'/signup',
    templateUrl: '/views/signup-tmpl.html',
    controller: 'signupController'
  })

  .state('game', {
    url:'/gametime',
    templateUrl: '/game/woopwoop.html'
  })

  .state('pong', {
    url:'/ponggame',
    templateUrl: '/gamepractice/pong3d.html'
  })

  .state('settings', {
    url:'/settings',
    templateUrl:'/views/Settings.html'
  })

  .state('progress', {
    url:'/progress',
    templateUrl:'/views/progress.html'
  })

  .state('aboutme', {
    url:'/aboutme',
    templateUrl: '/views/about.html'
  })
  .state('arc', {
    url: '/arc',
    templateUrl: '/views/arcpong.html'
  })
  .state('smackboard', {
    url: '/smackboard',
    templateUrl:'/views/message.html',
    controller: 'messageCtrl',
         resolve: {
           messages: function(messageService) {
             return messageService.getMessage();
           }
         }
  })
    $urlRouterProvider.otherwise('/');
})
