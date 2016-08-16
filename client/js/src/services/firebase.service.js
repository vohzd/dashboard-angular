"use strict";

import serverConfig from "../config/firebase-server.config.js";

function firebaseService($firebaseAuth){

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
			return firebase.database().ref("/userWidgets/" + uid).once("value");
			/*firebase.database().ref("/userWidgets/" + uid).once("value")
				.then((snapshot) => {
					returnVal = snapshot.val();
					console.log("about to return");
					return returnVal;
				})
				.catch((error) => {
					console.log("hlep");
					console.log(error)
				})
				*/
		},
		updateWidget: (widgetName, payload, userMeta) => {
			if (userMeta){

				let key = firebase.database().ref(widgetName + "Meta/" + userMeta.user.uid).push().key;
				return firebase.database().ref(widgetName + "Meta/" + userMeta.user.uid + "/" + key).set(payload)
					.then(() => {
						firebase.database().ref("userWidgets/" + userMeta.user.uid + "/" + widgetName + "/" + key).set(payload)
						return true;
					})

			}
		}
	}

}

firebaseService.$inject = ["$firebaseAuth"];


export default firebaseService;
