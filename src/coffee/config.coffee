angular.module('app')
.config([
    '$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
    ($stateProvider, $urlRouterProvider, $ionicConfigProvider) ->
      $ionicConfigProvider.tabs.position('bottom')

      $stateProvider
      .state 'tabs',
        url: '/tab'
        abstract: true
        templateUrl: 'templates/tabs.html'
      .state 'tabs.tab1',
        url: '/tab1'
        views:
          tab1:
            templateUrl: 'templates/tab1.html'
      .state 'tabs.tab2',
        url: '/tab2'
        views:
          tab2:
            templateUrl: 'templates/tab2.html'

      $urlRouterProvider.otherwise('/tab/tab1')
  ])
