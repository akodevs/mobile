'use strict';

angular.module('canvassApp')
  .controller('SettingsCtrl', function ($scope, $rootScope, $location, loginServices) {
      
    	$scope.syncData = function() {
           
            var btn = $("#syncButton");
                btn.button('loading')
                $.ajax()
                  .always(function () {
                      setTimeout(function(){ 
                 		 btn.button('reset')
                      },3000);
                }); 
            
            	var userIdentity = app.Login.getUserIdentity();
            	app.SugarCRMSynchronizer.syncDb(userIdentity.sugarId, function(){});

        }
      
  });