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
    'kendo.directives'
])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login.tpl.html',
        controller: 'LoginCtrl'
      })
      .when('/list', {
        templateUrl: 'partials/list.tpl.html', 
        controller: 'ListCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings.tpl.html', 
        controller: 'SettingsCtrl'
      })
      .when('/grid/:id/:name', {
        templateUrl: 'partials/grid.tpl.html', 
        controller: 'GridCtrl'
      }) 
      .when('/convert/:id/:sugarId/:name', {
        templateUrl: 'partials/convert.tpl.html', 
        controller: 'ConvertCtrl'
      })
      .when('/linkingCode/:id/:name', {
        templateUrl: 'partials/linkingCode.tpl.html', 
        controller: 'LinkingCodeCtrl'
      })
      .when('/disposition/:id/:sugarId/:name/:disposition', {
        templateUrl: 'partials/disposition.tpl.html', 
        controller: 'DispositionCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'partials/dashboard.tpl.html', 
        controller: 'DashboardCtrl'
      })
      .when('/meetings', {
        templateUrl: 'partials/calendar.tpl.html', 
        controller: 'CalendarCtrl'
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