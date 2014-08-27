'use strict';

angular.module('canvassApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, loginServices, databaseServices, sugarCRMSynchronizer) {

        $scope.errors = [];
        $scope.username = "";
        $scope.password = "";
            
          
        //Check Status
        $scope.$watch('online', function(connectionStatus) {  
            $scope.errors = [];
            if(connectionStatus === true && loginServices.isUserAuthenticated() === false){ 
                  sugarCRMSynchronizer.syncUser();   
             }
            else if(loginServices.isUserAuthenticated() === true) { 
                  $location.path( "/list" ); 
            } 
            else {
                $scope.errors.push('The device must be online for the inital configuration.');
            }
        });


       

        $scope.login = function () {

            $scope.errors = [];    
                
            if($scope.username === '') {
                $scope.errors.push('Please enter your username');
            }

            if($scope.password === '') { 
                $scope.errors.push('Please enter your password');
            }
                
            if($scope.errors.length > 0) {
                return;
            }
                  

           loginServices.loginUser(function() { 
                      if (loginServices.isUserAuthenticated() && loginServices.isAppOnline()) { 
                        $scope.userIdentity = loginServices.getUserIdentity();
                    	sugarCRMSynchronizer.syncDb($scope.userIdentity.sugarId, function(){
                      	 //canvassApp.mobileApp.navigate('views/canvassingView.html');
                               //$location.path("/settings");
                                        
                              $location.path('/list').replace();
                              $scope.$apply();
                        });   
                      } 
            }, $scope.username, $scope.password);
            

        };

     
        $scope.logout = function () {
          	window.localStorage.setItem("userIdentity", null);
              //canvassApp.mobileApp.navigate('#loginPage');
          };

        $scope.getUserNickname = function() {
        	
          	var userIdentity = getUserIdentity();
              if (userIdentity === null)
              	return "Guest";
              
              return userIdentity.name;
          };
    
       
  });
