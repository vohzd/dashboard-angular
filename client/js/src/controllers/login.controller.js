function LoginController($scope, $rootScope, $window, $firebaseAuth, firebaseAuthFactory, currentUserService){

	firebaseAuthFactory.initialise();

	this.auth = firebaseAuthFactory.getInstance();

	this.auth.$signInWithPopup("google").then((result) => {

		let ref = currentUserService.bindUserProfile(result);

		console.log(ref);
		//$window.redirect("/");

	}).catch((error) => {
		console.log("fail... ", error);
	})


}

LoginController.$inject = ["$scope", "$rootScope", "$window", "$firebaseAuth", "firebaseAuthFactory", "currentUserService"];


export default LoginController;