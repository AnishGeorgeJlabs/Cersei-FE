(function() {
  angular.module('app', ['ionic']).run([
    '$ionicPlatform', function($ionicPlatform) {
      return $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          return StatusBar.styleDefault();
        }
      });
    }
  ]);

}).call(this);

(function() {
  angular.module('app').config([
    '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      $ionicConfigProvider.tabs.position('bottom');
      $stateProvider.state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      }).state('tabs.tab1', {
        url: '/tab1',
        views: {
          tab1: {
            templateUrl: 'templates/tab1.html'
          }
        }
      }).state('tabs.tab2', {
        url: '/tab2',
        views: {
          tab2: {
            templateUrl: 'templates/tab2.html'
          }
        }
      });
      return $urlRouterProvider.otherwise('/tab/tab1');
    }
  ]);

}).call(this);
