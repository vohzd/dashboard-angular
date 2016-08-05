
/*
// configs
import firebaseServerConfig from "./config/firebase.config.js";
import firebaseUiWrapperConfig from "./config/firebase-ui.config.js";

// init
firebase.initializeApp(firebaseServerConfig());

*/


function LoginController($scope, $rootScope, $firebaseAuth, firebaseAuthFactory){

	firebaseAuthFactory.initialise();

	let auth = firebaseAuthFactory.getInstance();

	console.log(auth);

	/*
	let auth = $firebaseAuth(firebase.auth());

	auth.$signInWithPopup("google").then((firebaseUser) => {
		console.log("signed is as ", firebaseUser.uid);
	}).catch((error) => {
		console.log("auth failed with " , error);
	})
	*/

}

LoginController.$inject = ["$scope", "$rootScope", "$firebaseAuth", "firebaseAuthFactory"];


export default LoginController;