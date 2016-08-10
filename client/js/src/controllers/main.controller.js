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
	firebaseService.initialise();

	if (!firebaseService.getAuth()){
		firebaseService.logInAsGuest().then((response) => {
			console.log(response);
			this.username = "guest";
		}).catch((error) => {
			console.log("error: ", error);
		})
	}

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