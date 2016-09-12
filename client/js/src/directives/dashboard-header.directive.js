import $ from "jquery";

function dashboardHeader($rootScope){
	
	return {

		restrict: "E",
		templateUrl: "../../../views/dashboard-header.html",
		replace: true,
		scope: {},
		bindToController: {
			displayImgSrc: "=",
			username: "=",
			userSignedIn: "=",
			userWidgetMeta: "="
		},
		controller(){
			this.toggleMenuOptions = () => {
				performMenuToggle();
			},
			this.signUserIn = () => {
				$rootScope.$emit("signUserIn");
			},
			this.signUserOut = () => {
				$rootScope.$emit("signUserOut");
			}
			this.getObjectLength = (obj) => {
				if (!obj) return;
				return Object.keys(obj).length;
			}

		},
		controllerAs: "userManager"
	}

}

dashboardHeader.$inject = ["$rootScope"];



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
	}
}


export default dashboardHeader;