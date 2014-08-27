'use strict'

/* Login Services */

canvassApp.factory('loginServices',  ['sugarCRMDataProvider', '$rootScope', '$location', 
 function(sugarCRMDataProvider, $rootScope, $scope, $location){ 

          var getUserIdentity = function() {
              
          	var identity = window.localStorage.getItem("userIdentity"); 
              if (identity === null)
              	return null;
              
              return JSON.parse(identity);
          }
        
          var isUserAuthenticated = function() {
            
              var userIdentity = getUserIdentity();
              if (userIdentity !== null && userIdentity.userName.length > 0) 
                      return true;
              
              return false;
          }
        

          var setAuthCookie = function (user) {
             
             var identity = new UserIdentity();
             identity.sugarId = user.sugar_user_id;
             identity.userName = user.username;
             identity.name = user.firstname;
 
             window.localStorage.setItem("userIdentity", JSON.stringify(identity));
          };
        
          var isAppOnline = function() {
        	   return $rootScope.online;   
          };
        
          var loginUser = function (callback, username, password) {    
			
              if (isUserAuthenticated())  $location.path( "/list" );	
              	//canvassApp.mobileApp.navigate('views/canvassingView.html');
		      
              var userName = username;  
              var maybePassword = password;
              var hashedMaybePassword = CryptoJS.MD5(maybePassword).toString();
	
              User.all().filter("username", '=', userName).list(function(users) {
					
                  if (users.length === 0) { 
                       $scope.errors.push('User does not exist'); 
                      return;
                  }
                  var user = users[0];
             
                  if ((typeof user.password === 'undefined' || user.password === null) && isAppOnline()) { 
                      
        			 sugarCRMDataProvider.isValidUser(user.username, maybePassword, function(isValid) {
              		
                  		if (isValid) {
                              user.password = hashedMaybePassword;
                              persistence.flush();
                              
							  setAuthCookie(user);
							  callback(); 
                          
                          }  
              		});
         
                  } else if (typeof user.password !== 'undefined') {

                  	if (user.password !== hashedMaybePassword) { 
                         $scope.errors.push('User Password is incorrect'); 
                 		return;
             		 } 
                      
                      setAuthCookie(user);
                      callback(); 

                  } else { 
                        //loginData.set("errorMessage", "");   
                  }
                  
                  //kendo.mobile.application.hideLoading();
              });
              
          };
     
          var logout = function () {
          	window.localStorage.setItem("userIdentity", null); 
          };
          
         
        
         return {   
            loginUser: loginUser,
            isUserAuthenticated: isUserAuthenticated,
            getUserIdentity: getUserIdentity,  
            isAppOnline: isAppOnline,
            logout: logout
         };
        
}]);