function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	$firebaseObject,
	$firebaseArray,
	firebaseService,
	backendService,
	userService
	){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING + VARS
	// -------------
	firebaseService.initialise();
	this.username = userService.currentUsername();
	this.displayImgSrc = userService.currentAvatar();
	this.userUid = userService.currentUid();
	$scope.userWidgetMeta = null;

	// -----------------------------------------------------------------
	// CHECK AND LOG IN PRIOR SESSION
	// -----------------------------
	this.auth = firebaseService.getAuth();

	// listener which fires when the users state changes from null, guest, or logged in
	this.auth.$onAuthStateChanged((userDetails) => {

		if (userDetails){

			let firebaseAuthPromise = firebase.auth().getToken(true);
			let authTokenPromise = backendService.authenticateToken;
			let returningWidgetsPromise = firebaseService.getWidgets;

			// promises are s w e e t !
			firebaseAuthPromise
				.then((idToken) => backendService.authenticateToken(idToken))
				.then((userCreds) => {
					this.username = userService.currentUsername(userCreds.name.split(" ")[0]);
					this.displayImgSrc = userService.currentAvatar(userCreds.picture);
					this.userUid = userService.currentUid(userCreds.uid);
				})
				.then(() => {
					return returningWidgetsPromise(this.userUid)
				})
				.then((snapshot) => {
					console.log(snapshot.val())
					$scope.userWidgetMeta = $firebaseObject(snapshot.val());
					console.log($scope.userWidgetMeta);
				})
				.catch((error) => {
					console.log(error);
				})


				/*
				.then(() => {
					returningWidgetsPromise(this.userUid)
						.then((mini) => {
							console.log("ffs");
							console.log(mini)
						});
				})
				.then((snapshot) => {
					console.log("hello!");
					console.log(snapshot)
					console.log(snapshot.val())
				})
				.catch((error) => {
					console.log(error);
				})
				/*
				.then((widgetsMeta) => {
					console.log("this would have broken");
					console.log(widgetsMeta);
					$scope.userWidgetMeta = $firebaseObject(widgetsMeta)
				})
				.then(() => {
					console.log($scope.userWidgetMeta);
				})
				.catch((error) => {
					console.log(error);
				})
				*/

		}
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
				console.log(response);
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
"$firebaseArray",
"firebaseService",
"backendService",
"userService"
];

// send to main.js
export default mainController;