function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	firebaseAuthFactory,
	currentUserService,
	dbService
	){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

	// TODO... determine how user is logged in
	dbService.authenticate().then((firstResponse) => {

		// done, now feed that into a new request
		dbService.retrieveProfile(firstResponse.data).then((secondResponse) => {
			$scope.currentUserMeta = secondResponse.data;
		})

	});

	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------
	$rootScope.$on("signUserIn", () => {

		firebaseAuthFactory.initialise();
		this.auth = firebaseAuthFactory.getInstance();
		this.auth.$signInWithPopup("google").then((result) => {
			//let ref = currentUserService.bindUserProfile(result);
			console.log(result);
		}).catch((error) => {
			console.log("fail... ", error);
		});

	});


}

// Inject so when it's minified it doesn't go mental
mainController.$inject = [
"$scope",
"$rootScope",
"$firebaseAuth",
"firebaseAuthFactory",
"currentUserService",
"dbService"
];

// send to main.js
export default mainController;