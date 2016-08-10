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

			return firebase.database().ref("profiles/" + googleMeta.user.uid).set({
				fullName: googleMeta.user.displayName,
				email: googleMeta.user.email,
				photo : googleMeta.user.photoURL,
				widgetsInUse: []
			}).then(() => {
				return true;
			})

		},
		getWidgets: (userDetails) => {
			return firebase.database().ref("profiles/" + userDetails.user.uid + "/widgets");
		}
	}

}

firebaseService.$inject = ["$firebaseAuth"];


export default firebaseService;
