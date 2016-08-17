import $ from "jquery";

function todoController($scope, $rootScope, $firebaseObject, toastr){

	// ------------
	// INIT
	// ----

	this.addNewTodoTitle = "";

	// ------------
	// EVENTS
	// ------
	
	this.addNewTodoSubmit = () => {

		if (!this.addNewTodoTitle){
			toastr.info("Please enter something :)", "Empty");
		} 
		else {

			const newTodo = {
				title: this.addNewTodoTitle,
				added: Date.now()
			};

			// reset
			this.addNewTodoTitle = "";

			// write todo to db, angularfire will take care of the rest
			$rootScope.$emit("writeToFirebase", "todo", newTodo);

		}

	};

	// make the little toolbar icon clickable
	this.revealContextMenu = () => {
		$(".all-todos-list").toggleClass("nudge-top");
		$(".todo-revealed-options").toggleClass("reveal-element");
		$(".todo-options-menu").toggleClass("dimmed");
	}

	// allow the deletion of ALL todos
	this.deleteAllTodos = () => {
		// delete evvvveerrrrryyything
		$rootScope.$emit("deleteWidgetMeta", "todo");
	}

}

todoController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default todoController;