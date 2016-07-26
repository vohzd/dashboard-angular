import $ from "jquery";

function dashboardHeader(){
	
	return {

		restrict: "E",
		templateUrl: "../../../views/dashboard-header.html",
		replace: true,
		scope: {},
		controller(){
			this.userName = "guest";
			this.toggleMenuOptions = (event) => {
				if ($(".user-management").hasClass("expanded-menu")){
					console.log("has menu")
				}
				else {
					console.log("no menu!")
				}
			}
		},
		controllerAs: "userManager"

	}

}


export default dashboardHeader;