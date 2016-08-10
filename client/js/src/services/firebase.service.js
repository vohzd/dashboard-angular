"use strict";

import serverConfig from "../config/firebase-server.config.js";

function firebaseAuthFactory($firebaseAuth){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getMethods: () => {
			return $firebaseAuth();
		},
		logInAsGuest: () => {
			return $firebaseAuth().$signInWithEmailAndPassword("guestaccount@intheon.uk", "guest123456").then((user) => {
				return user;
			});
		}
	}

}

firebaseAuthFactory.$inject = ["$firebaseAuth"];


export default firebaseAuthFactory;
