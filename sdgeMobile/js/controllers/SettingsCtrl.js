'use strict';

angular.module('canvassApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $location, loginServices, databaseServices, sugarCRMSynchronizer) {
      
	  $rootScope.showNav = true; 
      $scope.drawer.hide();
      $scope.show = function(event, section) {
        $scope.drawer.hide();
       
      };
          
      
  });