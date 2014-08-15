'use strict'

/* SugarCRM Synchronizer Services */

canvassApp.factory('sugarCRMSynchronizer', ['sugarCRMDataProvider',

	 function(sugarCRMDataProvider) {  
         
        var mapUser = function (sugarUser) {
            var user = new User();
            user.firstname = sugarUser["first_name"];
            user.lastname = sugarUser["last_name"];
            user.username = sugarUser["user_name"];
            user.sugar_user_id = sugarUser["id"];
            user.email = sugarUser["email_address"];
            user.sugar_user_id = sugarUser["id"];
            user.password = sugarUser["password"];
            return user;
        };
        
        var syncUsers = function(sugarUsers, localUsers) {
            console.log('asd');
                    
            for(var i = 0; i < sugarUsers.length; i++) {

                localUsers.forEach(function(localUser) {

                    if (sugarUsers[i]["id"] === localUser.sugar_user_id) {
                        
                       sugarUsers[i]["password"] = localUser.password;
                    }
            	});
                
                persistence.add(mapUser(sugarUsers[i])); 
            }
        }
        
        var mapCanvass = function (sugarCanvass) {
            var canvass = new Canvass();
            canvass.sugar_canvass_id = sugarCanvass["sugar_canvass_id"]; 
            canvass.sdge_account_number = sugarCanvass["sdge_account_number"]; 
            canvass.prizm_code = sugarCanvass["prizm_code"]; 
            canvass.canvassing_due_date = sugarCanvass["canvassing_due_date"]; 
            canvass.canvassing_list_name = sugarCanvass["canvassing_list_name"]; 
            canvass.assigned_to_id = sugarCanvass["assigned_to_id"]; 
            canvass.assigned_user_name = sugarCanvass["assigned_user_name"]; 
            canvass.do_not_call = sugarCanvass["do_not_call"]; 
            canvass.primary_address_street = sugarCanvass["primary_address_street"]; 
            canvass.primary_address_city = sugarCanvass["primary_address_city"]; 
            canvass.primary_address_postalcode = sugarCanvass["primary_address_postalcode"]; 
            canvass.disposition = sugarCanvass["disposition"]; 
            canvass.is_ready_for_sync = sugarCanvass["is_ready_for_sync"]; 
            canvass.linking_code = sugarCanvass["linking_code"]; 
            return canvass;
        };

        var syncCanvasses = function(sugarCanvasses) { 
            for(var i = 0; i < sugarCanvasses.length; i++) {
                persistence.add(mapCanvass(sugarCanvasses[i]));
            }
        };
        
        var mapMeeting = function (sugarMeeting) {
            var meeting = new Meeting(); 
            meeting.sugar_meeting_id = sugarMeeting["MeetingId"];
            meeting.title =  sugarMeeting["Title"]; 
            meeting.start =  sugarMeeting["Start"]; 
            meeting.end =  sugarMeeting["End"];
            meeting.description =  sugarMeeting["Description"]; 
            meeting.assigned_to_id =  sugarMeeting["assigned_user_id"]; 
            meeting.date_entered =  sugarMeeting["date_entered"];  
            return meeting;
        };

        var syncMeetings = function(sugarMeetings) {
            for(var i = 0; i < sugarMeetings.length; i++) {
                persistence.add(mapMeeting(sugarMeetings[i])); 
            }    
        }
        
        var mapDisposition = function (key, value) {
            var disposition = new LookupDisposition(); 
            disposition.code = key;
            disposition.name = value;  
            return disposition;
        };
        
        var syncDispositions = function(sugarDispositions) {

            JSON.parse(JSON.stringify(sugarDispositions), function (key, value) {
                if (key !== "")
					persistence.add(mapDisposition(key, value)); 
			}); 
        }
        
        var syncDbWithSugarCRM = function(userSugarId, callback) {

            //kendo.mobile.application.showLoading();
 
            persistence.schemaSync();
            
            User.all().list(function(localUsers) {
                 persistence.reset(function() {
                	persistence.schemaSync(function() {
                		sugarCRMDataProvider.getData(userSugarId, function(data) {
                            
                        	callback(data, localUsers);
                            
                            persistence.flush(function(){ 
                				//kendo.mobile.application.hideLoading();
                			});
                    	});
                	});
            	});
            });
        }

        var syncDb = function(userSugarId, callback) {
    		syncDbWithSugarCRM(userSugarId, function(data, localUsers) {
                
                syncUsers(data["users"], localUsers);
                
                if (app.Login.isUserAuthenticated()) {
                	syncCanvasses(data["canvassing"]);
        			syncDispositions(data["dispositions"]);
                    syncMeetings(data["meetings"]);
                    callback();
                }
            });
        };
        
        var syncUser = function() { 
            
            syncDbWithSugarCRM(null, function(data, localUsers) { 
                syncUsers(data["users"], localUsers);
            });
        };
        
        return { 
            syncDb : syncDb,
            syncUser : syncUser
        };
}]);
    