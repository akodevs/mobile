'use strict'

/* SugarCRM Synchronizer Services */

canvassApp.factory('sugarCRMDataProvider', function() { 

            
        var connect = function(userName, password, callback) {
            
          var login = {
            	user_auth:{
                	user_name: userName,
        			password: CryptoJS.MD5(password).toString()
        		},
        		application: "SugarCRM RestAPI"
            };
            
       	 $.ajax({
            	url: "https://csr.rhainc.com/crm_dev8/service/v4_1/rest.php",
                type: "GET",
                data: { method: "login", input_type: "JSON", response_type: "JSON", rest_data: JSON.stringify(login) },
                dataType: "json",
                beforeSend: function() {
                   // kendo.mobile.application.showLoading();
                },
                success: function(data){
                    
                    callback(data);
                },
                error: function(xhr, status, error) {
                	navigator.notification.alert("Error occurred");
                    //kendo.mobile.application.hideLoading();
                }
        	});
        };
        
        var isValidUser = function(userName, password, callback) {
        	
            connect(userName, password, function(data) {
                
                var isValid = true;
                
                if (typeof data.number !== 'undefined' && data.number === 10)
                	isValid = false;

                callback(isValid);
            });
        };
        
        var execute = function(callback) {
            
            connect("sjones", "Aalpha1!", function(data) {
            	
                if (typeof data.number !== 'undefined' && data.number === 10) {
                    navigator.notification.alert("Invalid login credentials.");
                    //kendo.mobile.application.hideLoading();
                    return;
                }
                    
                callback();
            });
        };            
        
        var getData = function(userSugarId, callback) {
            
            execute(function() {
                $.ajax({
                    url: "https://csr.rhainc.com/crm_dev8/index.php?module=SugarToSp&action=SyncMobileCanvassing&user_id="+userSugarId,
                    type: "GET",
                    dataType: "json",
                    success: function(data) {
                        
                        try {
                            callback(data);
                        } catch(ex) {
                            console.log(ex.message);
                            navigator.notification.alert("Error saving sugar data into local database.");
                        }
                       
                        //kendo.mobile.application.hideLoading();
                    },
                    error: function() {
                        navigator.notification.alert("Error getting sugarcrm data.");
                    	//kendo.mobile.application.hideLoading();
                    }
                });
            });
        };
        
    
         var sendData = function(dataJson, callback) {
            
            execute(function() {
                $.ajax({
                    url: "https://csr.rhainc.com/crm_dev8/index.php?module=SugarToSp&action=SyncMobileCanvassingInbound",
                    data: 'dataJson='+dataJson,
                    type: "POST",
                    dataType: "json",
                    success: function() {
                        
                        try {
                            callback();
                        } catch(ex) {
                            console.log(ex.message);
                            navigator.notification.alert("Error saving sugar data into local database.");
                        }
                       
                        //kendo.mobile.application.hideLoading();
                    },
                    error: function() {
                        navigator.notification.alert("Error sending sugarcrm data.");
                    	//kendo.mobile.application.hideLoading();
                    }
                });
            });
        };
        
    
        return {
            getData : getData,
            sendData : sendData,
            isValidUser : isValidUser
        };
        
    
});