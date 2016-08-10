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
	this.displayImgSrc = "img/detective.png";
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
				console.log(response);
				createUserPromise(response);
				userMeta = response;
				this.username = response.user.displayName.split(" ")[0];
				this.displayImgSrc = response.user.photoURL;

			})
			.then(() => getWidgetPromise(userMeta))
			.then((widgetsMeta) => $scope.userWidgetMeta = $firebaseObject(widgetsMeta))
			.catch((error) => {
				console.log(error);
			})

	});

	$rootScope.$on("writeToFirebase", (event, whatToWrite, payload) => {

		let writePromise = firebaseService.updateWidget;
		writePromise(whatToWrite, payload, userMeta)

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