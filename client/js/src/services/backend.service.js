"use strict";

function backendService (
	$http,
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

		requestRss: (url) => {
			return $http.get("http://rss2json.com/api.json?rss_url=" + url)
		}

	}

}

backendService.$inject = ["$http", "$firebaseAuth"]

export default backendService;
