'use strict';

angular.module('canvassApp')
  .controller('LinkingCodeCtrl', ['$scope',  '$location',  'canvassServices', '$routeParams', 
		function ($scope, $location,  canvassServices, $routeParams) {  
       
       	var canvass = $scope.canvass = []; 
           $scope.name =  $routeParams.name;
            
            canvassServices.getLinkingCode($scope, $routeParams.id, function() {
                    canvass = $scope.canvass; 
                   console.log(canvass);
            		$scope.refresh();  
            });
     
             
            $scope.goBack = function(){    
                $location.path("/grid/" + $scope.sugarId + "/" + $scope.name);  
                
            } 
   
		   $scope.refresh = function(){ $scope.$apply(); }
    
  }]);