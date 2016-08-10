"use strict";

import serverConfig from "../config/firebase-server.config.js";

function firebaseService($firebaseAuth){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getMethods: () => {
			return $firebaseAuth();
		},
		getReference: (url) => {
			return firebase.database().ref(url);
		},
		logInAsGuest: () => {
			return $firebaseAuth().$signInWithEmailAndPassword("guestaccount@intheon.uk", "guest123456").then((user) => {
				return user;
			});
		}
	}

}

firebaseService.$inject = ["$firebaseAuth"];


export default firebaseService;
