"use strict";

import serverConfig from "../config/firebase-server.config.js";
import browserConfig from "../config/firebase-browser.config.js";

function firebaseAuthFactory($firebaseAuth){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getInstance: () => {
			return $firebaseAuth(firebase.auth());
		}
	}

}

firebaseAuthFactory.$inject = ["$firebaseAuth"];


export default firebaseAuthFactory;
