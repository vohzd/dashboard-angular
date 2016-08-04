function mainController($scope, $rootScope, dbService){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

	// todo determine whether user is logged in
	this.authentication = "guest";

	// set a single source of truth to hold the users current state / metadata
	$scope.currentUserMeta = null;

	// when page is loaded, grab the meta
	if (this.authentication == "guest"){
		dbService.retrieveProfile("1").then((response) => {
			$scope.currentUserMeta = response.data;
		})
	}
	else if (this.authentication == "google_user"){
		console.log("loading google profile");
	}

	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------


}

mainController.$inject = ["$scope","$rootScope", "dbService"];






export default mainController;