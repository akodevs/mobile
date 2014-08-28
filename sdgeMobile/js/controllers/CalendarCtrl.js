'use strict';

angular.module('canvassApp')
  .controller('CalendarCtrl', ['$scope',  '$location', 'loginServices', 'canvassServices', '$routeParams', 
		function ($scope, $location, loginServices,  canvassServices, $routeParams) { 
           
            var meetings = $scope.meetings = [];  
            var userIdentity = loginServices.getUserIdentity();        
                 
                 
            canvassServices.getMeetings($scope, userIdentity.sugarId, function() {
               meetings = $scope.meetings; 
                console.log(meetings)
               $scope.refresh(); 
            }); 

            $scope.refresh = function(){ $scope.$apply(); }

  }]);