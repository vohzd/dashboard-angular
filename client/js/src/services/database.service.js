"use strict";

function databaseService ($http, $q, $rootScope){

	// todo, introduce some auth middleware
	// having these doable as unauthenticated is really bad!!


	return {
		retrieveProfile: (profileId) => {
			return $http.get("/userProfile/" + profileId);
		},
		updateMasterScope: (json) => {
			return $http.put("/userProfile/" + json.accountId, json.userWidgetMeta);
		}
	}

}

export default databaseService;
