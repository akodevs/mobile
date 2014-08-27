'use strict';

angular.module('canvassApp')
  .controller('DashboardCtrl', ['$scope',  '$location', 'loginServices', 'canvassServices', '$routeParams', 
		function ($scope, $location, loginServices,  canvassServices, $routeParams) { 
           
            var data_Disposition = $scope.data_Disposition = []; 
            var data_Conversion = $scope.data_Conversion = []; 
            var data_ConversionRatio = $scope.data_ConversionRatio = []; 
            var userIdentity = loginServices.getUserIdentity();        
                 
                 
            canvassServices.getDashboard($scope, userIdentity.sugarId, function() {
               data_Disposition = $scope.data_Disposition;
               data_Conversion = $scope.data_Conversion;
               data_ConversionRatio = $scope.data_ConversionRatio; 
                
               $scope.refresh(); 
            }); 

            $scope.refresh = function(){ $scope.$apply(); }

  }]);