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

			$http.post("/authenticateToken", payload)
				.then((response) => {
					console.log("yep");
					console.log(response);
					return response;
				})
				.catch((error) => {
					console.log("nope");
					console.log(error);
				})

		}

	}

}

export default backendService;
