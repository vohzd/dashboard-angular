import $ from "jquery";

function todoController(){

	this.allTodos = [
		{
			title: "One massive title",
			timeAdded: "A while ago"
		},
		{
			title: "Two",
			timeAdded: "A day ago"
		},
		{
			title: "Three sets of titles",
			timeAdded: "A while ago"
		}
	];

	this.addNewTodoTitle = "";
	this.addNewTodoSubmit = () => {
		if (!this.addNewTodoTitle){
			// todo... notfications
			return;
		}
		else {

			const newTodo = {
				title: this.addNewTodoTitle,
				timeAdded: new Date()
			};

			this.allTodos.push(newTodo);
			this.addNewTodoTitle = "";

			console.log("i need to add ", newTodo, " to the DB");

		}
	}


	this.revealContextMenu = () => {
		$(".all-todos-list").toggleClass("nudge-top");
		$(".todo-revealed-options").toggleClass("reveal-element");
		$(".todo-options-menu").toggleClass("dimmed");
	}



}


export default todoController;