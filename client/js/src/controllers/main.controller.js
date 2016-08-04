function mainController($scope, $rootScope, dbService){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

	$scope.currentUserMeta = null;

	// todo determine whether user is logged in
	dbService.authenticate().then((firstResponse) => {

		console.log(firstResponse.data)

		// done, now feed that into a new request
		dbService.retrieveProfile(firstResponse.data).then((secondResponse) => {

			console.log(secondResponse);

			$scope.currentUserMeta = secondResponse.data;

			console.log($scope.currentUserMeta);
		})

	});

	// set a single source of truth to hold the users current state / metadata
	$scope.currentUserMeta = null;

	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------


}

mainController.$inject = ["$scope","$rootScope", "dbService"];






export default mainController;