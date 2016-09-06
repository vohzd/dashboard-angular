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

	// connect to firebase
	firebaseService.initialise();

	// set my user metadata to null/undefined
	this.userSignedIn = null;
	this.username = userService.currentUsername();
	this.displayImgSrc = userService.currentAvatar();
	this.userUid = userService.currentUid();
	this.userWidgetMeta = null;
	$scope.userWidgetMeta = null;

	// grab an instance of the firebase getAuth method
	this.auth = firebaseService.getAuth();

	this.loopInProg = false;

	// -----------------------------------------------------------------
	// CHECK AND LOG IN PRIOR SESSION
	// -----------------------------

	// listener which fires when the users state changes from null, guest, or logged in
	this.auth.$onAuthStateChanged((userDetails) => {
		// if user is an actually, previously logged in user
		if (userDetails){
			this.initialiseReturningUser();
		}

		// if user is a guest
		if (userDetails === null){
			this.initialiseGuestUser();
		}
	});

	// -----------------------
	// INTERNAL FUNCTIONS
	// ------------------

	// Log in as guest
	this.initialiseGuestUser = () => {
		let guestPromise = firebaseService.logInAsGuest;
		let getWidgetPromise = firebaseService.getUsersWidget;

		// son, go over the hill and tell me if i can go fishing
		guestPromise()
			.then((response) => {
				this.username = userService.currentUsername()
				this.displayImgSrc = userService.currentAvatar();
			})
			.then(() => getWidgetPromise(this.userUid))
			.then((widgetsMeta) => {
				this.userWidgetMeta = $scope.userWidgetMeta = $firebaseObject(widgetsMeta);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	// Log in as existing user
	this.initialiseReturningUser = () => {
		let firebaseAuthPromise = firebase.auth().getToken(true);
		let authTokenPromise = backendService.authenticateToken;
		let returningWidgetsPromise = firebaseService.getUsersWidgets;

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
				this.userWidgetMeta = $scope.userWidgetMeta = $firebaseObject(snapshot);

				// tell the child controllers they can access the scope data

				/*
				$scope.userWidgetMeta.$loaded().then(() => {
					$rootScope.$broadcast("widgetScopeUpdated");
				});
				*/

				// front-end a notification
				toastr.success("Welcome back  " + this.username, "Signed in");

				console.log($scope.userWidgetMeta);
			})
			.catch((error) => {
				console.log(error);
			})
	}





	// ----------------------------------------------------------------------
	// BROADCAST / EMIT EVENTS
	// -----------------------

	// CREATE
	// A request to go and create a *brand new* record, with it's own id
	// under the currently logged in user, and matching widget
	$rootScope.$on("createNewWidgetRecordForUser", (event, widgetName, itemToAdd) => {
		let newPromise = firebaseService.createOneNewRecordForWidget;
		newPromise(this.userUid, widgetName, itemToAdd)
	});


	// READ



	// UPDATE



	// DELETE



	// sign in button clicked, bring up google oAuth screen
	$rootScope.$on("signUserIn", () => {

		let googlePromise = firebaseService.logInWithGoogle;
		let createUserPromise = firebaseService.createUser;
		let getWidgetPromise = firebaseService.getUsersWidgets;

		googlePromise()
			.then((response) => {
				createUserPromise(response);
				this.username = userService.currentUsername(response.user.displayName);
				this.displayImgSrc = userService.currentUsername(response.user.photoURL);
				this.userUid = userService.currentUsername(response.user.uid);
			})
			.then(() => getWidgetPromise(this.userUid))
			.then((widgetsMeta) => {
				this.userWidgetMeta = $scope.userWidgetMeta = $firebaseObject(widgetsMeta);
			})
			.catch((error) => {
				console.log(error);
			})

	});

	// remove the user
	$rootScope.$on("signUserOut", () => {
		toastr.info("Signing out...");
		this.auth.$signOut();
	});

	// write an update to the db (when user adds stuff)
	$rootScope.$on("writeToFirebase", (event, whatToWrite, payload) => {
		console.log("writing...");
		console.log(whatToWrite);
		console.log(payload);


		$scope.userWidgetMeta.todo = payload

		/*

		This doesnt worked b/c you need to associate each record with a key

		*/

		console.log($scope.userWidgetMeta);

		$scope.userWidgetMeta.$save();
		/*
		let writePromise = firebaseService.updateWidget;
		writePromise(whatToWrite, payload, this.userUid)
			.then(() => {
				setTimeout(() => {
					// best i can do!
					$rootScope.$broadcast("widgetScopeUpdated");
				}, 300)
			})

			*/
	});

	// deletes a widgets stuff
	$rootScope.$on("deleteWidgetMeta", (event, widgetName) => {
		let deletePromise = firebaseService.deleteWidget;
		deletePromise(widgetName, this.userUid);
	});

	// updates master scope
	$rootScope.$on("updateLocalParentScope", (event, keyName, keyId, newItem) => {

		console.log("updateLocalParentScope:" , keyName, keyId, newItem);

		$scope.userWidgetMeta[keyName][keyId].parsed = newItem;
		this.userWidgetMeta[keyName][keyId].parsed = newItem;

	});

	// deletes a specific record
	$rootScope.$on("deleteElementFromFirebase", (event, widgetName, recordKey) => {

		let deleteRecordPromise = firebaseService.deleteSpecificRecord;
		deleteRecordPromise(widgetName, this.userUid, recordKey);

	});

	$rootScope.$on("updateFirebaseScopeTotally", (event) => {

		$scope.userWidgetMeta.$save();

	});

	$rootScope.$on("separateArchivedTodos", (event) => {

		console.log("fail");

		/*

		// THIS IS HOOOOORRRRRIBBLLLE
		// TODO.... sort out schema to store these two separate values

		if (!this.loopInProg){
			this.loopInProg = true;

			setTimeout(() => {

				for (let todoKey in $scope.userWidgetMeta.todo){
					if ($scope.userWidgetMeta.todo[todoKey].archived === true){

						if (!$scope.userWidgetMeta.archivedTodos){
							$scope.userWidgetMeta.archivedTodos = {};
						}

						$scope.userWidgetMeta.archivedTodos[todoKey] = $scope.userWidgetMeta.todo[todoKey]
					}

					this.userWidgetMeta.archivedTodos = $scope.userWidgetMeta.archivedTodos;

				}


			}, 100)

			setTimeout(() => {
				this.loopInProg = false;
			}, 4000)

		}

*/


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