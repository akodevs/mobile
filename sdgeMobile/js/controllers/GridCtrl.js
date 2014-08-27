'use strict';

angular.module('canvassApp')
  .controller('GridCtrl', ['$scope',  'canvassServices', '$routeParams', 
		function ($scope,   canvassServices, $routeParams) { 
       
            
        var canvassList = $scope.canvassList = []; 
            
            
        //var list = new kendo.data.DataSource({   data: [ ]   });
            
          
         
        canvassServices.fetchGrid($scope, $routeParams.name, function(){ 
                canvassList = $scope.canvassList;
               /* list.fetch(function(){
                  list.data(canvassList);
                  $scope.data = list.data();
                });*/
                $scope.refresh(); 
        }); 
              
        
        $scope.gridOptions = function(canvassList) {
              
            //console.log(canvassList);
            return {
                dataSource: canvassList, 
                columns: [
                  { template: kendo.template($('#dispositionTemplate').html()), field: "disposition", title: "Disposition", width: '16%' },
                  { field: "primary_address_street", title: "Address" , width: '16%'},
                  { field: "primary_address_city", title: "City" , width: '12%'},
                  { field: "primary_address_postalcode", title: "Postal Code", width: '18%' }, 
                  { field: "prizm_code", title: "Prizm Code", width: '18%' },
                  { template: kendo.template($('#optionsTemplate').html()), title: "Options", width: '20%' },
                 ]
            }
         };
            
		$scope.refresh = function(){ $scope.$apply(); }
          
            
    
  }]);