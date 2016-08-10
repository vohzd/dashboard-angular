function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	$firebaseObject,
	firebaseService,
	databaseService
	){

	// ----------------------------------------------------------------
	// VARS
	// ----

	this.username = "unknown";

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------


	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------

}

// Inject so when it's minified it doesn't go mental
mainController.$inject = [
"$scope",
"$rootScope",
"$firebaseAuth",
"$firebaseObject",
"firebaseService",
"databseService",
];

// send to main.js
export default mainController;