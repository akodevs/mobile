'use strict';

/**
 * @ngdoc function
 * @name myTodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTodoApp
 */
angular.module('canvassApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.todos = ['todo 1', 'todo2', 'todo3'];

    $scope.addTodo = function() {
    	$scope.todos.push($scope.todo);
    	$scope.todo = '';
    };

    $scope.removeTodo = function(index) {
    		$scope.todos.splice(index, 1);	
    };
  });
