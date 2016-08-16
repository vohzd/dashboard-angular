"use strict";

function backendService (
	$http,
	$q,
	$rootScope,
	$firebaseAuth,
	){


	return {

		authenticateToken: (accessToken) => {

			let payload = {
				"accessToken": accessToken
			};


			return $http.post("/authenticateToken", accessToken)
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					console.log("or here");
					console.log(error);
					return false;
				})
		}

	}

}

export default backendService;
