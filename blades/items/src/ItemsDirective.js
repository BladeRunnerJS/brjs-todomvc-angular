'use strict';

var angular = require( 'angular' );
var ServiceRegistry = require( 'br/ServiceRegistry' );

function ItemsDirective() {
	var HtmlService = ServiceRegistry.getService( 'br.html-service' );
	var todoService = ServiceRegistry.getService( 'todomvc.storage' );

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.items.view-template' ).outerHTML;

	this.controller = function( $scope ) {
		$scope.todos = todoService.getTodos();
		$scope.editedTodo = null;
		$scope.originalTodo = null;

		updateAllChecked();

		function updateAllChecked() {
			var todos = todoService.getTodos();
			var completedCount = 0;
			todos.forEach(function (todo) {
				completedCount += ( todo.completed? 1 : 0 );
			});
			$scope.allChecked = ( todos.length === completedCount );
		}

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

			updateAllChecked();
		};

		$scope.revertEditing = function (todo) {
			todo.title = $scope.originalTodo.title;
			todo.completed = $scope.originalTodo.completed;
			$scope.doneEditing(todo);
		};

		$scope.removeTodo = function (todo) {
			// todos.splice(todos.indexOf(todo), 1);
			todoService.removeTodo( todo );

			updateAllChecked();
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
