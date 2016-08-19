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
					return false;
				})
		},

		requestNewsData: (sourceURL) => {

			console.log(sourceURL);
			return $http.get("/parseFeed/" + sourceURL)
				.then((response) => {
					console.log(response);
					return response.data;
				})
				.catch((error) => {
					console.log("went horribly wrong");
					console.log(error);
				});


		}



	}

}

export default backendService;
