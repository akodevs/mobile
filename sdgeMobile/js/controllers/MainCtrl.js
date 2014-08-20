'use strict';

angular.module('canvassApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, loginServices) {
      
 $scope.userName = "";
 $scope.lastSync="";
 $scope.connectionStatus = ""; 
 $rootScope.showNav = false;
   
       
    //Check Status
    $scope.$watch('online', function(connectionStatus) {  
             console.log(loginServices.isUserAuthenticated() + '' + connectionStatus);
        if(loginServices.isUserAuthenticated()){
             $scope.userIdentity = loginServices.getUserIdentity(); 
             $scope.userName =  $scope.userIdentity.name;
             $scope.lastSync = "5 seconds ago"; 
        	 $scope.connectionStatus = (loginServices.isAppOnline() === true ?  "Online" : "Offline");
        } 

    });
  
$scope.show = function(event, section) {
    $scope.drawer.hide(); 
  };

});

     