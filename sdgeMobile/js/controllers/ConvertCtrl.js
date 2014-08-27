'use strict';

angular.module('canvassApp')
  .controller('ConvertCtrl', ['$scope',  '$location',  'canvassServices', '$routeParams', 
		function ($scope, $location,  canvassServices, $routeParams) { 
           
        
           $scope.id = $routeParams.id;
           $scope.name = $routeParams.name;
           $scope.sugarId = $routeParams.sugarId;
             
            
           $scope.covertCanvass = function() { 
                canvassServices.convertCanvass($scope.id, function() {
                   $location.path('/linkingCode/'  + $scope.id + "/" + $scope.name); 
                });
           }
            
            $scope.goBack = function(){     
                   $location.path('/grid/'  + $scope.id + "/" + $scope.name);  
            } 
   
		   $scope.refresh = function(){ $scope.$apply(); }
    
  }]);