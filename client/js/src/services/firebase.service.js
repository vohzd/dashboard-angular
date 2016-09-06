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
		createOneNewRecordForWidget: (uid, widgetName, whatToAdd) => {
			let newKeyId = firebase.database().ref("userWidgets/" + uid + "/" + widgetName).push().key;
			return firebase.database().ref("userWidgets/" + uid + "/" + widgetName + "/" + newKeyId).set(whatToAdd)
		},

		readOneExistingRecordForWidget: (uid, widgetName, widgetRecordId) => {
			return firebase.database().ref("userWidgets/" + uid + "/" + widgetName + "/" + widgetRecordId).val();
		},

		updateOneExistingRecordForWidget: (uid, widgetName, widgetRecordId, overwriteData) => {
			return firebase.database().ref("userWidgets/" + uid + "/" + widgetName + "/" + widgetRecordId).set(overwriteData)
		},

		deleteOneExistingRecordForWidget: (uid, widgetName, widgetRecordId) => {
			return firebase.database().ref("userWidgets/" + uid + "/" + widgetName + "/" + widgetRecordId).remove();
		},

		// retreive the entire payload for a particular user
		getUsersWidgets: (uid) => {
			return firebase.database().ref("/userWidgets/" + uid)
		},


		/* BIT WAZZY THESE */

		updateWidget: (widgetName, payload, userId) => {

			let key = firebase.database().ref("userWidgets/" + userId + "/" + widgetName).push().key;

			return firebase.database().ref("userWidgets/" + userId + "/" + widgetName + "/" + key).set(payload)

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
