import $ from "jquery";

function TodoCtrl(){

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
		},
		{
			title: "Different sizes",
			timeAdded: "A year ago"
		},
		{
			title: "Trying out the float effect",
			timeAdded: "A while ago"
		},
		{
			title: "Two",
			timeAdded: "A day ago"
		},
		{
			title: "Three",
			timeAdded: "A while ago"
		},
		{
			title: "Go Skateboarding",
			timeAdded: "A year ago"
		},
		{
			title: "http://testing.com",
			timeAdded: "A while ago"
		},
		{
			title: "Two",
			timeAdded: "A day ago"
		},
		{
			title: "Three",
			timeAdded: "A while ago"
		},
		{
			title: "Four",
			timeAdded: "A year ago"
		}
	];

	this.addNewTodoTitle = "";
	this.addNewTodoSubmit = () => {
		if (!this.addNewTodoTitle){
			// todo... notfications
		}
		else {
			this.allTodos.push({
				title: this.addNewTodoTitle,
				timeAdded: new Date()
			});
			this.addNewTodoTitle = "";
		}
	}


	this.revealContextMenu = () => {

		$(".all-todos-list").addClass("nudge-top");

		$(".todo-revealed-options").addClass("reveal-element");
		$(".todo-options-menu").addClass("dimmed");
	}



}


export default TodoCtrl;