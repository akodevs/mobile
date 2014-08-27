'use strict';

angular.module('canvassApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, loginServices, databaseServices) {
      
 $scope.userName = "";
 $scope.lastSync="";
 $scope.connectionStatus = ""; 
 $scope.showNav = false;
   
       
    //Check Status
    $scope.$watch('online', function(connectionStatus) {  
            
        if(loginServices.isUserAuthenticated()){
 			$scope.showNav = true;
             $scope.userIdentity = loginServices.getUserIdentity(); 
             $scope.userName =  $scope.userIdentity.name;
             $scope.lastSync = "5 seconds ago"; 
        	 $scope.connectionStatus = (loginServices.isAppOnline() === true ?  "Online" : "Offline");
        } 

    });
      
    $scope.$on('$routeChangeStart', function(next, current) {     
        //DB Init  
        databaseServices.openDb();     
        if(loginServices.isUserAuthenticated()){
            	
             $scope.userIdentity = loginServices.getUserIdentity(); 
             $scope.userName =  $scope.userIdentity.name;
             $scope.lastSync = "5 seconds ago"; 
             $scope.connectionStatus = (loginServices.isAppOnline() === true ?  "Online" : "Offline");
             $scope.showNav = (loginServices.isAppOnline() === true ?  true : false);
        }  
    });
       
  
$scope.show = function(event, page) {
    $scope.drawer.hide(); 
    if(page === 'logout'){
        loginServices.logout(); 
        $scope.userName = "";
        $scope.lastSync="";
        $scope.connectionStatus = ""; 
        $scope.showNav = false;
    	$location.path('/').replace();
    }
    else { 
    	$location.path('/'+ page).replace();
    }
  };

});

     