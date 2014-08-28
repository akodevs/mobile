'use strict';

angular.module('canvassApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $location, loginServices) {
      
    	$scope.syncData = function() {
           
            var userIdentity = loginServices.getUserIdentity();        
            var btn = $("#syncButton");
                btn.button('loading')
                $.ajax()
                  .always(function () {
                      setTimeout(function(){ 
                 		 btn.button('reset')
                      },3000);
                }); 
             
            	//app.SugarCRMSynchronizer.syncDb(userIdentity.sugarId, function(){});

        }
      
  });