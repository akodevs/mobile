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
           
           	fetchDisposition: function(scope, callback){
           		LookupDisposition.all().selectJSON(['*'], function(items) {
                         scope.dispositionList = items; 
                         callback(); 
                    });          
               },
           
           	convertCanvass: function(id, callback) {
                   
                       Canvass.load(id, function(item){ 
                            item.disposition = 'Converted';  
                            persistence.flush(function(){ });  
                       });  
           
                   callback();
               },
               
           	getLinkingCode: function(scope, id, callback){
                          Canvass.all().filter('id', '=', id).selectJSON(['*'], function(items){   
                              scope.canvass = items; 
                              callback();
                         }); 
               },
           
           	updateDisposition: function(disposition, id, callback) { 
                             LookupDisposition.all().filter('name', '=', disposition).selectJSON(['*'], function(items) {  
                                Canvass.load(id, function(canvassItem){ 
                                        //set the value
                                         canvassItem.disposition =  items[0].name;  
                                         persistence.flush(function(){  
                         					 callback();
                                         });   
                                        
                                 });
                            });  
               },
           
           	getDashboard: function(scope, sugarId, callback) {
                       
                        Canvass.all().filter("assigned_to_id", '=', sugarId).selectJSON(['*'], function(items) { 
                           
                          
                            var disposition_list = []; 
                            var data_disposition = [];  
                            var data_conversion = []; 
                            var i = items.length;  
                            
                            //inititalize for Conversion
                            data_conversion.push({   
                                    "disposition": "Converted", 
                                    "total": 0,}, 
                                     {   
                                        "disposition": "Not Converted", 
                                        "total": 0,  
                            });   
                            
                            while(i--) {  
                                	//Checking Total Disposition
                                 	//check if the Id exist. if not, then add to list of disposition.
                                    if(disposition_list.indexOf(items[i].disposition) < 0) { 
                                        data_disposition.push(
                                             {   
                                                "disposition": (items[i].disposition === ""? "No Disposition":items[i].disposition), 
                                                "total": 1,
                                             }
                                 	   );   
                                        disposition_list.push(items[i].disposition); 
                                    }  
                                	else {
                                        var currentIndex = disposition_list.indexOf(items[i].disposition);
                                        data_disposition[currentIndex].total = data_disposition[currentIndex].total + 1; 
                                    }
                                
                                	//Checking Total Conversion  
                                    var currentConversionIndex = 0;
                                    if(items[i].disposition !== "Converted") {
                                        currentConversionIndex = 1;
                                    }
                                    
                                    data_conversion[currentConversionIndex].total = data_conversion[currentConversionIndex].total + 1;   
                                
                            }  
                            
                             
                            //inititalize for Conversion Ratio
                            // 0 -- Converted, 1 -- Not Converted
                            var totalDispositionValue = data_conversion[0].total + data_conversion[1].total;
                            var data_conversion_ratio =  data_conversion[0].total / totalDispositionValue;   

                            scope.data_Disposition = data_disposition; 
                            scope.data_Conversion = data_conversion; 
                            scope.data_ConversionRatio = data_conversion_ratio;  

							callback();
       					 //console.log(data_disposition.length);
                          
                              
                        });     
               },
           
           	getMeetings: function(scope, sugarId, callback) {
                   
                       Meeting.all().filter("assigned_to_id", '=',  sugarId).selectJSON(['*'], function(items) {
                     	   var dataSource = new kendo.data.SchedulerDataSource({    
                                data: items, 
                              });
                              
                            scope.meetings = dataSource; 
                        	 
							callback();
                        });  
                            
               }
           
           	
           
           
           
       }
    
         
    
     
}]);