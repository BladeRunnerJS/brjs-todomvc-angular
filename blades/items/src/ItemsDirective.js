'use strict';

var angular = require( 'angular' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function ItemsDirective( $filter ) {
	var HtmlService = ServiceRegistry.getService( 'br.html-service' );
	var todoService = ServiceRegistry.getService( 'todomvc.storage' );

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.items.view-template' ).outerHTML;

	this.controller = function( $scope ) {
		$scope.todos = todoService.getTodos();
		console.log( $scope.todos );

		$scope.editedTodo = null;

		// $scope.$watch('todos', function (newValue, oldValue) {
		// 	$scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
		// 	$scope.completedCount = todos.length - $scope.remainingCount;
		// 	$scope.allChecked = !$scope.remainingCount; // === 0 nicer?
		// 	if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
		// 		//todoStorage.put(todos);
		// 	}
		// }, true);

		$scope.editTodo = function (todo) {
			$scope.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			$scope.originalTodo = angular.extend({}, todo);
		};

		$scope.doneEditing = function (todo) {
			$scope.editedTodo = null;
			todo.title = todo.title.trim();		

			if (!todo.title) {
				$scope.removeTodo(todo);
			}
			else {
				todoService.updateTodo( todo );
			}
		};

		$scope.revertEditing = function (todo) {
			todo.title = $scope.originalTodo.title;
			todo.completed = $scope.originalTodo.completed;
			$scope.doneEditing(todo);
		};

		$scope.removeTodo = function (todo) {
			// todos.splice(todos.indexOf(todo), 1);
			todoService.removeTodo( todo );
		};

		$scope.markAll = function (completed) {
			var todos = todoService.getTodos();
			todos.forEach(function (todo) {
				todo.completed = !completed;
				todoService.updateTodo( todo );
			});
		};

	};
}

module.exports = ItemsDirective;
