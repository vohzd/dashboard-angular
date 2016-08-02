"use strict";

function databaseService ($http, $q, $rootScope){

	return {
		retrieveProfile: (profileId) => {
			return $http.get("/userProfile/" + profileId);
		}
	}

}

export default databaseService;
