import $ from "jquery";

function todoController($state, $scope, $timeout, dbService){

	// bloody digest cycle and promises do not play nicely
	$timeout(() => {
		this.allTodos = $scope.$parent.currentUserMeta.userWidgetMeta[0].todo;
		console.log(this.allTodos);
	}, 500)


	this.addNewTodoTitle = "";
	this.addNewTodoSubmit = () => {
		if (!this.addNewTodoTitle){
			// todo... notfications
			return;
		}
		else {

			const newTodo = {
				title: this.addNewTodoTitle,
				added: new Date()
			};

			// push for optimistic loading
			$scope.$parent.currentUserMeta.userWidgetMeta[0].todo.push(newTodo)

			// reset
			this.addNewTodoTitle = "";
			// write master scope to db
			dbService.updateMasterScope($scope.$parent.currentUserMeta);
		}
	}

	this.revealContextMenu = () => {
		$(".all-todos-list").toggleClass("nudge-top");
		$(".todo-revealed-options").toggleClass("reveal-element");
		$(".todo-options-menu").toggleClass("dimmed");
	}


}

todoController.$inject = ["$state", "$scope", "$timeout", "dbService"];


export default todoController;