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
      .when('/settings', {
        templateUrl: 'partials/settings.html', 
      })
      .otherwise({
        redirectTo: '/'
      });
});




//App Run Settings
canvassApp.run(function($window, $rootScope) {
      $rootScope.online = false;   
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false; 
        });
      }, true);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;  
        });
      }, true);
      $window.addEventListener("orientationchange", function () {
          if (device.platform === 'iOS') {
            setTimeout(function() {
                $(document.body).height(window.innerHeight);
            }, 10);
         }
      });
});