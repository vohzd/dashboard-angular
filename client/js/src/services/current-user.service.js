"use strict";

function currentUserService (){

	return {
		bindUserProfile(profile){

			console.log(profile);
			if (!profile) return;

			function getProfile() {
				console.log("running");
				return profile;
			}

			return getProfile();
			
		}
	}

}

export default currentUserService;
