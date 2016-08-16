function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	$firebaseObject,
	firebaseService,
	backendService
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
	// CHECK FOR PRIOR COOKIE/LOG IN
	// -----------------------------
	this.auth = firebaseService.getAuth();

	// listener which fires when the users state changes from null, guest, or logged in
	this.auth.$onAuthStateChanged((userDetails) => {

		if (userDetails){
			console.log("user logged in");
			firebase.auth().getToken(true).then((idToken) => {
				// send access token to backend
				backendService.authenticateToken(idToken.accessToken);

			}).catch((error) => {
				console.log("here is an error");
				console.log(error);
			})
		}
		else {
			console.log("user not logged in");
		}
		console.log(userDetails);
	});

	// -----------------------------------------------------------------
	// PROMISES
	// --------

	/*
	firebaseService.logInAsGuest()
		.then((response) => {
			this.username = "guest";
		});
*/


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
"backendService"
];

// send to main.js
export default mainController;