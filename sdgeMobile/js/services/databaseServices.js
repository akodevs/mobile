'use strict'

/* Database Services */

canvassApp.factory('databaseServices', function() {
    
	
     var openDb = function() {
        persistence.store.websql.config(
              persistence,
              'canvassingAppDB',
              '0.0.1',                // DB version
              'My database',          // DB display name
              5 * 1024 * 1024,        // DB size
              0                       // SQLitePlugin Background processing disabled
         );  
         
         
         
    };
      
    var resetDb = function() {
        persistence.reset(function() {
        	console.log("Database has been reset!");
      	});
    };
      
    return { 
        openDb : openDb, 
    	resetDb : resetDb, 
    };
    
    
});