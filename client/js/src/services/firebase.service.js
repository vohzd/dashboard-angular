"use strict";

import serverConfig from "../config/firebase-server.config.js";

function firebaseService($firebaseAuth, $firebaseObject, userService){

	return {
		initialise: () => {
			firebase.initializeApp(serverConfig);
		},
		getAuth: () => {
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
			}).then(() => {
				return true;
			})

		},
		getWidgets: (uid) => {
			return firebase.database().ref("/userWidgets/" + uid)
		},
		updateWidget: (widgetName, payload, userId) => {

			let key = firebase.database().ref(widgetName + "Meta/" + userId).push().key;

			return firebase.database().ref(widgetName + "Meta/" + userId + "/" + key).set(payload)
				.then(() => {
					firebase.database().ref("userWidgets/" + userId + "/" + widgetName + "/" + key).set(payload)
					return true;
				})

		},

		deleteWidget: (widgetName, userId) => {

			let userWidgets = $firebaseObject(firebase.database().ref("userWidgets/" + userId + "/" + widgetName));
			let widgetsMeta = $firebaseObject(firebase.database().ref(widgetName + "Meta/" + userId));

			userWidgets.$remove();
			widgetsMeta.$remove();

		},

		deleteSpecificRecord: (widgetName, userId, recordKey) => {

			let userWidgets = $firebaseObject(firebase.database().ref("userWidgets/" + userId + "/" + widgetName + "/" + recordKey));
			let widgetsMeta = $firebaseObject(firebase.database().ref(widgetName + "Meta/" + userId + "/" + recordKey));

			userWidgets.$remove();
			widgetsMeta.$remove();

		}
	}
}

firebaseService.$inject = ["$firebaseAuth", "$firebaseObject", "userService"];


export default firebaseService;
