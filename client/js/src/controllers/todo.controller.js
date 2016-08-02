import $ from "jquery";

function todoController($rootScope, subscriptionFactory){

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

			// push for optimistic loading
			this.allTodos.push(newTodo);

			// reset
			this.addNewTodoTitle = "";

			// request a snapshot of what the todo's currently look like

			subscriptionFactory.emit({
				"requestedAction": "requestScopeSnapshot",
				"targetProperty": "todo",
				"listenerCallback": "updateTodosMeta",
				"transportedPayload": null,
			});

			// react to the above call when complete!
			$rootScope.$on("updateTodosMeta", (event, todosPayload) => {
				console.log("i should defffffinnnnely be firing");
			})



		}
	}


	this.revealContextMenu = () => {
		$(".all-todos-list").toggleClass("nudge-top");
		$(".todo-revealed-options").toggleClass("reveal-element");
		$(".todo-options-menu").toggleClass("dimmed");
	}



}


export default todoController;