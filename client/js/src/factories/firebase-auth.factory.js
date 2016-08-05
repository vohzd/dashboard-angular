"use strict";

import serverConfig from "../config/firebase.config.js";

function firebaseAuthFactory($firebaseAuth){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getInstance: () => {
			return $firebaseAuth();
		}
	}

}

firebaseAuthFactory.$inject = ["$firebaseAuth"];


export default firebaseAuthFactory;
