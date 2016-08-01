"use strict";

function databaseService ($http, $q, $rootScope){

	const wrapper = {
		retrieveProfile: (profileId) => {
			return $http.get("/userProfile/" + profileId);
		}
	}

	return wrapper;

}

export default databaseService;
