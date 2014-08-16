'use strict';

/**
 * @ngdoc function
 * @name myTodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTodoApp
 */
angular.module('canvassApp')
  .controller('LoginCtrl', function ($scope, loginServices, databaseServices, sugarCRMSynchronizer) {
    
      
      
    //DB Init  
	databaseServices.openDb(); 
    
    //Check Connection
    $scope.$watch('online', function(newStatus) {  
         if(newStatus === true){
              sugarCRMSynchronizer.syncUser();
         }
    });
      
       
      
   $scope.login = function () {

   		loginServices.loginUser(function() {
              if (loginServices.isUserAuthenticated() && loginServices.isAppOnline()) {
                var userIdentity = loginServices.getUserIdentity();
            	sugarCRMSynchronizer.syncDb(userIdentity.sugarId, function(){
              	 //canvassApp.mobileApp.navigate('views/canvassingView.html');
                    alert('logged In');
                });   
              }
           }, $scope.username, $scope.password);
      };
    
    $scope.loginUsingKeycode = function (e) {
        	  if (e.keyCode === 13) {
                    $(e.target).blur();
                    login();
              }
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
