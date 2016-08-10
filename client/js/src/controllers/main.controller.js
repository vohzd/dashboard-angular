function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	$firebaseObject,
	firebaseService,
	databaseService
	){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING + VARS
	// -------------
	firebaseService.initialise();
	this.username = "unknown";
	this.userWidgetMeta = null;

	// -----------------------------------------------------------------
	// PROMISES
	// --------
	firebaseService.logInAsGuest()
		.then((response) => {
			this.username = "guest";
		});

	// ----------------------------------------------------------------------
	// LISTENING EVENTS
	// ------------
	$rootScope.$on("signUserIn", () => {

		let googlePromise = firebaseService.logInWithGoogle;
		let createUserPromise = firebaseService.createUser;
		let getWidgetPromise = firebaseService.getWidgets;
		let userMeta = null;

		googlePromise()
			.then((response) => {
				createUserPromise(response);
				userMeta = response;
			})
			.then(() => getWidgetPromise(userMeta))
			.then((widgetsMeta) => this.userWidgetMeta = $firebaseObject(widgetsMeta))

	});

}

// Inject so when it's minified it doesn't go mental
mainController.$inject = [
"$scope",
"$rootScope",
"$firebaseAuth",
"$firebaseObject",
"firebaseService",
"databaseService"
];

// send to main.js
export default mainController;