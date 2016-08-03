import $ from "jquery";

function todoController($state, dbService){

	this.allTodos = $scope.$parent.currentUserMeta.userWidgetMeta.todo;

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
			$scope.$parent.currentUserMeta.userWidgetMeta.todo.push(newTodo)

			// reset
			this.addNewTodoTitle = "";

			// write master scope to db
			dbService.writeMasterScope($scope.$parent.currentUserMeta)

		}
	}

	this.revealContextMenu = () => {
		$(".all-todos-list").toggleClass("nudge-top");
		$(".todo-revealed-options").toggleClass("reveal-element");
		$(".todo-options-menu").toggleClass("dimmed");
	}


}

todoController.$inject = ["$state", "dbService"];


export default todoController;