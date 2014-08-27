'use strict';

angular.module('canvassApp')
  .controller('DispositionCtrl', ['$scope',  'canvassServices', '$routeParams', '$location',
		function ($scope,  canvassServices, $routeParams, $location) { 
       
            
           $scope.id = $routeParams.id;
           $scope.name = $routeParams.name;
           $scope.sugarId = $routeParams.sugarId;
           $scope.disposition = $routeParams.disposition;
           $scope.dispositionInput = $routeParams.disposition; 
            
       	var dispositionList = $scope.dispositionList = []; 
                 
             
            canvassServices.fetchDisposition($scope, function(){ 
                    dispositionList = $scope.dispositionList;   
            }); 
                 

            $scope.handleChange = function(selected, data) {
                $scope.data = data; 
            };
            
            $scope.gridOptions = function(dispositionList) {
               
                return {
                    dataSource: dispositionList, 
                    sortable: true, 
    				selectable: "row",
                    dataBound:function(e) { 
                      var grid = e.sender;
                      var data = grid._data;
                       
                      data.forEach(function(entry) {
                          if($scope.dispositionInput === entry.name){ 
              				grid.select('tr[data-uid="' + entry.uid + '"]');  
                          	console.log(entry.uid);
                          }
                      })
                    },
                    columns: [ 
                      { field: "name", title: "Disposition Code"   }, 
                      { field: "code", title: "Name"   }, 
                     ]
                }
            };
            
            $scope.update = function() {
                canvassServices.updateDisposition($scope.data.name, $scope.id, function() { 
                    $location.path('/grid/'  + $scope.id + "/" + $scope.name); 
                    $scope.refresh();  
                });
                
            }
            
            
            $scope.goBack = function(){     
                   $location.path('/grid/'  + $scope.id + "/" + $scope.name); 
                
            } 
             
    		$scope.refresh = function(){ $scope.$apply(); }
              
            
    
  }]);