/*'use strict';

// Declare app level module which depends on filters, and services
angular.module('canvassApp', []).
	config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl:'partials/login.html', controller:LoginCtrl});
        $routeProvider.otherwise({redirectTo:'/'});
}]);
    */
'use strict';

/**
* @ngdoc overview
* @name myTodoApp
* @description
* # myTodoApp
*
* Main module of the application.
*/
var canvassApp = angular
.module('canvassApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',   
])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});



//Check Status
canvassApp.run(function($window, $rootScope) {
      $rootScope.online = false;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);
});