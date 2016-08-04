function mainController($scope, $rootScope, dbService){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

	// todo determine whether user is logged in
	dbService.authenticate().then((firstResponse) => {

		// done, now feed that into a new request
		dbService.retrieveProfile(firstResponse.data).then((secondResponse) => {
			$scope.currentUserMeta = secondResponse.data;
		})

	});

	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------


}

mainController.$inject = ["$scope","$rootScope", "dbService"];






export default mainController;