var User = persistence.define('User', { 
    sugar_user_id: "TEXT",
    username: "TEXT", 
    password: "TEXT",  
    firstname: "TEXT",
    lastname: "TEXT",
    email: "TEXT"
 });
 
var Canvass = persistence.define('Canvass', {
    sugar_canvass_id: "TEXT",
    sdge_account_number: "TEXT",
    prizm_code: "TEXT",
    canvassing_due_date: "TEXT",
    canvassing_list_name: "TEXT",
    assigned_to_id: "TEXT",
    assigned_user_name: "TEXT",
    do_not_call: "TEXT",
    primary_address_street: "TEXT",
    primary_address_city: "TEXT",
    primary_address_postalcode: "TEXT",
    disposition: "TEXT",
    is_ready_for_sync: "INT",
    linking_code: "TEXT"
    
});


var LookupDisposition = persistence.define('LookupDisposition', {
    code: "TEXT",
    name: "TEXT"
});



var Meeting = persistence.define('Meeting', { 
    sugar_meeting_id: "TEXT",
    start: "TEXT",  
    end: "TEXT",
    title: "TEXT",
    description: "TEXT",
    assigned_to_id: "TEXT",
    date_entered: "TEXT"
 });


var UserIdentity = function(){
    var sugarId = "",
    	userName = "",
    	name = "";
    
    return {
        sugarId: sugarId,
        userName: userName,
        name: name
    };
};