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
