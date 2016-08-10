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
	$scope.userWidgetMeta = null;
	let userMeta = null;

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

		googlePromise()
			.then((response) => {
				createUserPromise(response);
				userMeta = response;
			})
			.then(() => getWidgetPromise(userMeta))
			.then((widgetsMeta) => {
				$scope.userWidgetMeta = $firebaseObject(widgetsMeta);
				console.log($scope.userWidgetMeta);
			})

	});

	$rootScope.$on("writeToFirebase", (event, whatToWrite, payload) => {

		let writePromise = firebaseService.updateWidget;

		writePromise(whatToWrite, payload, userMeta)
			.then((res) => {
				console.log($scope.userWidgetMeta);
			})

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