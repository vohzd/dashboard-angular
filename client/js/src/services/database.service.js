"use strict";

function databaseService (
	$http,
	$q,
	$rootScope,
	$firebaseAuth,
	firebaseAuthFactory,
	){

	// todo, introduce some auth middleware
	// having these doable as unauthenticated is really bad!!


	return {

		/*
		authenticate: () => {
			return $http.get("/authenticate");
		},
		retrieveProfile: (profileId) => {
			return $http.get("/userProfile/" + profileId);
		},
		updateMasterScope: (json) => {
			return $http.put("/userProfile/" + json._id, json);
		}*/


		retreiveGuestProfile(){
			console.log("hello!!!")
		}
	}

}

export default databaseService;
