"use strict";

import serverConfig from "../config/firebase-server.config.js";

function firebaseAuthFactory($firebaseAuth){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getAuth: () => {
			return $firebaseAuth(firebase.auth());
		},
		logInAsGuest: () => {
			return $firebaseAuth().$logInWithUsernameAndPassword("guestaccount@intheon.uk", "guest123456").then((user) => {
				return user;
			});
		}
	}

}

firebaseAuthFactory.$inject = ["$firebaseAuth"];


export default firebaseAuthFactory;
