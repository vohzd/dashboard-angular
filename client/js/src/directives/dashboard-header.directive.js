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
			},
			this.onSignIn = (googleUser) => {
		        // Useful data for your client-side scripts:
		        var profile = googleUser.getBasicProfile();
		        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
		        console.log('Full Name: ' + profile.getName());
		        console.log('Given Name: ' + profile.getGivenName());
		        console.log('Family Name: ' + profile.getFamilyName());
		        console.log("Image URL: " + profile.getImageUrl());
		        console.log("Email: " + profile.getEmail());

		        // The ID token you need to pass to your backend:
		        var id_token = googleUser.getAuthResponse().id_token;
		        console.log("ID Token: " + id_token);
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
	}
}

export default dashboardHeader;