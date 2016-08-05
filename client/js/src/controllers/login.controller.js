function LoginController($scope, $rootScope, $firebaseAuth, firebaseAuthFactory){

	firebaseAuthFactory.initialise();

	this.auth = firebaseAuthFactory.getInstance();

	this.auth.$signInWithPopup("google").then((result) => {
		console.log(result);
		console.log("signed in as ", result.user.uid);
	}).catch((error) => {
		console.log("fail... ", error);
	})


}

LoginController.$inject = ["$scope", "$rootScope", "$firebaseAuth", "firebaseAuthFactory"];


export default LoginController;