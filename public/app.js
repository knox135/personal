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
  .state('settings', {
    url:'/settings',
    templateUrl:'/views/Settings.html'
  })
  .state('progress', {
    url:'/progress',
    templateUrl:'views/progress.html'
  })
    $urlRouterProvider.otherwise('/');
})
