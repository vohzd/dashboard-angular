function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	firebaseAuthFactory,
	userAuthService,
	dbService
	){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

	firebaseAuthFactory.initialise();
	this.userStatus = firebaseAuthFactory.getInstance().$getAuth();

	console.log(this.userStatus);

	/*
	this.userStatus = userAuthService.determineLogInStatus();

	if (this.userStatus == "unknown"){

		// todo... get the guest profile

		dbService.retreiveGuestProfile().then((guestProfileMeta) => {
			$scope.currentUserMeta = guestProfileMeta.data;
		});

	}
	else if (this.userStatus == "authorised"){
		console.log("do something here")
	}

	*/


	/*

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

	*/

	$rootScope.$on("signUserIn", () => {
		console.log("wat");
		console.log(firebaseAuthFactory.getInstance().$getAuth())
		this.auth = firebaseAuthFactory.getInstance();
		this.auth.$signInWithPopup("google").then((result) => {
			console.log(firebaseAuthFactory.getInstance().$getAuth())
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
"userAuthService",
"dbService"
];

// send to main.js
export default mainController;