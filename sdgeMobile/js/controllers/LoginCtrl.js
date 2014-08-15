'use strict';

/**
 * @ngdoc function
 * @name myTodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTodoApp
 */
angular.module('canvassApp')
  .controller('LoginCtrl', function ($scope, $rootScope, databaseServices, sugarCRMSynchronizer) {
   	
    $scope.user = {
    username: '',
    password: ''
    };
       
      
	databaseServices.openDb(); 
    
    $scope.$watch('online', function(newStatus) {  
         if(newStatus === true){
              sugarCRMSynchronizer.syncUser();
         }
    });
      
       
  });
