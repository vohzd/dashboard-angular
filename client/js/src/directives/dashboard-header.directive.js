import $ from "jquery";

function dashboardHeader(){
	
	return {

		restrict: "E",
		templateUrl: "../../../views/dashboard-header.html",
		replace: true,
		scope: {},
		controller(){
			this.userName = "guest";
			this.toggleMenuOptions = () => {
				performMenuToggle();
			}
		},
		controllerAs: "userManager"

	}

}


function performMenuToggle(){
	if (!$(".user-management").hasClass("nudge")){
		$(".user-management").addClass("nudge");
		setTimeout(function(){
			$(".user-authentication").addClass("show-user-authentication");
		},1000)
	}
	else {
		$(".user-authentication").removeClass("show-user-authentication");
		setTimeout(function(){
			$(".user-management").removeClass("nudge");
		},1000)
	//$(".user-authentication").removeClass("expanded-menu");
	}
}


export default dashboardHeader;