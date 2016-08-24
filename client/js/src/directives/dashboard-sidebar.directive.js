import $ from "jquery";

function dashboardSidebar(){
	
	return {

		"restrict": "E",
		"templateUrl": "../../../views/dashboard-sidebar.html",
		"replace": true,
		"scope": {},
		"bindToController": {},
		controller(){

			const initialRoute = window.location.pathname;

			switch (initialRoute){
				case "/feed":
					$(".feed").addClass("active-link");
					break;
				case "/todo":
					$(".todo").addClass("active-link");
					break;
				case "/calendar":
					$(".calendar").addClass("active-link");
					break;
				case "/health":
					$(".health").addClass("active-link");
					break;
			}

			this.moveHighlight = (event, offset) => {
				$(".hover-highlighter").css({
					"height": 42 * offset + "px"
				})

			},

			this.resetHighlight = () => {

				$(".hover-highlighter").css({
					"height": "0px"
				})

			},

			this.applyActiveLink = (event) => {

				$(".sidebar-menu-items li").removeClass("active-link");

				$(event.target).addClass("active-link");

			}
		},
		"controllerAs": "sidebar"
	}

}

export default dashboardSidebar;