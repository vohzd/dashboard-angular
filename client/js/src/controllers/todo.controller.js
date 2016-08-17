import $ from "jquery";

function todoController($scope, $rootScope, $firebaseObject){

	// ------------
	// INIT
	// ----

	this.addNewTodoTitle = "";


	$rootScope.$on("userWidgetMeta", (event, payload) => {

		console.log(payload);
		console.log(payload.todo);
		$scope.allTodos = payload.todo;

		//$scope.$apply;
	});


	// ------------
	// EVENTS
	// ------
	
	this.addNewTodoSubmit = () => {

		if (!this.addNewTodoTitle){
			// todo notifications
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

}

todoController.$inject = ["$scope", "$rootScope", "$firebaseObject"];


export default todoController;