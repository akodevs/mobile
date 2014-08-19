'use strict';

angular.module('canvassApp')
  .controller('ListCtrl', function ($scope, $rootScope, $location, loginServices, databaseServices, sugarCRMSynchronizer) {
      
     $scope.show = function(event, section) {
        $scope.drawer.hide();
       
      };
          
      
  });