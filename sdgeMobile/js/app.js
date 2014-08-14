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
angular
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
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
