'use strict';

angular.module('canvassApp')
  .controller('ListCtrl', ['$scope', '$rootScope', 'loginServices', function ($scope, $rootScope, loginServices) {
      
        $rootScope.showNav = true;  
        $scope.userIdentity = loginServices.getUserIdentity();
        $scope.canvass= new kendo.observable({ 
            data: [],
            detailTemplate: kendo.template($("#mobileListViewTemplate").html()),
        });

/*       console.log($scope.userIdentity.sugarId);
      
        Canvass.all().filter("assigned_to_id", '=', $scope.userIdentity.sugarId).selectJSON(['*'], function(items) {  
              
                //Group by canvass id, so canvass name should only show once in list view
                $scope.canvass_list = [];
                $scope.data = []; 
                $scope.i = items.length; 
                 while(i--) {  
                     	//check if the Name exist. if not, then add.  
                        if($scope.canvass_list.indexOf(items[i].canvassing_list_name) < 0) { 
                            $scope.data.push(
                                 { 
                                    "id": items[i].id,
                                    "sugar_canvass_id": items[i].sugar_canvass_id,
                                    "disposition": items[i].disposition, 
                                    "canvassing_list_name": items[i].canvassing_list_name,
                                 }
                     	   );  
                            $scope.canvass_list.push(items[i].canvassing_list_name); 
                        } 
                } 

                $scope.canvass.set("data", data); 
                       
           
        });  
                   */
       
      
      
  }]);