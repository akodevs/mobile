'use strict'

canvassApp.factory( 'canvassServices', ['loginServices', function(loginServices) {
    

       return {
       		fetchAll: function( scope, callback ){
              	  var userIdentity = loginServices.getUserIdentity(); 
            		Canvass.all().filter("assigned_to_id", '=', userIdentity.sugarId).selectJSON(['*'], function(items) {  
                              
                                //Group by canvass id, so canvass name should only show once in list view
                                var canvass_list = [];
                                var data = []; 
                                var i = items.length; 
                                while(i--) {  
                                     	//check if the Name exist. if not, then add.  
                                        if(canvass_list.indexOf(items[i].canvassing_list_name) < 0) { 
                                            data.push(
                                                 { 
                                                    "id": items[i].id,
                                                    "sugar_canvass_id": items[i].sugar_canvass_id,
                                                    "disposition": items[i].disposition, 
                                                    "canvassing_list_name": items[i].canvassing_list_name,
                                                 }
                                     	   );  
                                           canvass_list.push(items[i].canvassing_list_name); 
                                        } 
                                } 
								//console.log(callback);
                               scope.canvassList = data;
                        	   callback(); 
                           
                       });   
        		},
               fetchGrid: function(scope, canvassListName, callback) { 
                         Canvass.all().filter("canvassing_list_name", '=', canvassListName).order('primary_address_postalcode', false).order('primary_address_city', false).order('primary_address_street', false).selectJSON(['*'], function(items) { 
                                           scope.canvassList = items; 
                                    	   callback(); 
                        });  
                       
               },
           
           
       }
    
         
    
     
}]);