'use strict';

angular.module('canvassApp')
  .controller('ListCtrl', ['$scope', '$rootScope', 'loginServices', 'canvassServices', function ($scope, $rootScope, loginServices, canvassServices) {
        var canvassList = $scope.canvassList = [];
        //$rootScope.showNav = true;  
        //$scope.userIdentity = loginServices.getUserIdentity();
       /* $scope.canvass= new kendo.observable({ 
            data: [],
            detailTemplate: kendo.template($("#mobileListViewTemplate").html()),
        });*/
 
		canvassServices.fetchAll($scope, function(){ canvassList = $scope.canvassList; $scope.refresh(); });
       
		$scope.refresh = function(){ $scope.$apply(); }
  }]);