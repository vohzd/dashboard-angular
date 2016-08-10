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
		},
		logInWithGoogle: () => {
			return $firebaseAuth().$signInWithPopup("google").then((user) => {
				return user;
			});
		},
		createUser: (googleMeta) => {

			console.log(googleMeta);
			/*
			return firebase.database().ref("profiles/" + googleMeta.uid).set({
				fullName: googleMeta.displayName,
				email: googleMeta.email,
				photo : googleMeta.photoURL,
				widgetsInUse: []
			});*/
		},
		getWidgets: (param) => {
			console.log("im amazed you made it this far?!")
		}
	}

}

firebaseService.$inject = ["$firebaseAuth"];


export default firebaseService;
