'use strict';

var ServiceRegistry = require( 'br/ServiceRegistry' );

function FilterDirective() {
	var HtmlService = ServiceRegistry.getService( 'br.html-service' );
	var todoService = ServiceRegistry.getService( 'todomvc.storage' );

	this.restrict = 'E';
	this.replace = true;
	this.template = HtmlService.getHTMLTemplate( 'brjstodo.filter.view-template' ).outerHTML;

	this.controller = function( $scope ) {

		$scope.todos = todoService.getTodos();

		update();

		function update() {
			var todos = todoService.getTodos();
			var completedCount = 0;
			todos.forEach(function (todo) {
				completedCount += ( todo.completed? 1 : 0 );
			});
			$scope.remainingCount = ( todos.length - completedCount );
			$scope.completedCount = completedCount;
		}

		$scope.clearCompletedTodos = function () {
			var todos = todoService.getTodos();
			var todo, i;
			for( i = todos.length - 1; i >= 0; --i ) {
				todo = todos[ i ];
				if( todo.completed ) {
					todoService.removeTodo( todo );
				}
			}
		};

		todoService.on( 'todo-added', update );
		todoService.on( 'todo-updated', update );
		todoService.on( 'todo-removed', update );
	}
}

module.exports = FilterDirective;
