function mainController(
	$scope,
	$rootScope,
	$firebaseAuth,
	$firebaseObject,
	$firebaseArray,
	firebaseService,
	backendService,
	userService,
	toastr
	){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING + VARS
	// -------------
	firebaseService.initialise();
	this.userSignedIn = null;
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
					this.userSignedIn = userCreds.name ? true : false;
					this.username = userService.currentUsername(userCreds.name);
					this.displayImgSrc = userService.currentAvatar(userCreds.picture);
					this.userUid = userService.currentUid(userCreds.uid);
				})
				.then(() => {
					return returningWidgetsPromise(this.userUid)
				})
				.then((snapshot) => {
					//toastr.success("HELLLLLOOOOOOO", "subheading");
					$scope.userWidgetMeta = $firebaseObject(snapshot);
				})
				.catch((error) => {
					console.log(error);
				})
		}

		if (userDetails === null){
			let guestPromise = firebaseService.logInAsGuest;
			let getWidgetPromise = firebaseService.getWidgets;
			guestPromise()
				.then((response) => {
					this.username = userService.currentUsername()
					this.displayImgSrc = userService.currentAvatar();
				})
				.then(() => getWidgetPromise(this.userUid))
				.then((widgetsMeta) => {
					$scope.userWidgetMeta = $firebaseObject(widgetsMeta)
				})
				.catch((error) => {
					console.log(error);
				})
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
				createUserPromise(response);
				this.username = userService.currentUsername(response.user.displayName);
				this.displayImgSrc = userService.currentUsername(response.user.photoURL);
				this.userUid = userService.currentUsername(response.user.uid);

			})
			.then(() => getWidgetPromise(this.userUid))
			.then((widgetsMeta) => {
				$scope.userWidgetMeta = $firebaseObject(widgetsMeta);
				toastr.success("message");
			})
			.catch((error) => {
				console.log(error);
			})

	});

	$rootScope.$on("signUserOut", () => {
		this.auth.$signOut();
	});

	// adds in a new widget record to db
	$rootScope.$on("writeToFirebase", (event, whatToWrite, payload) => {

		let writePromise = firebaseService.updateWidget;
		writePromise(whatToWrite, payload, this.userUid)

	});

	// deletes a widgets stuff
	$rootScope.$on("deleteWidgetMeta", (event, widgetName) => {

		let deletePromise = firebaseService.deleteWidget;
		deletePromise(widgetName, this.userUid);


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
"userService",
"toastr"
];

// send to main.js
export default mainController;