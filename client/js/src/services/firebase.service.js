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
		updateWidget: (widgetName, payload, userId) => {

			let key = firebase.database().ref(widgetName + "Meta/" + userId).push().key;

			return firebase.database().ref(widgetName + "Meta/" + userId + "/" + key).set(payload)
				.then(() => {
					firebase.database().ref("userWidgets/" + userId + "/" + widgetName + "/" + key).set(payload)
					return true;
				})

		},

		deleteWidget: (widgetName, userId) => {

			let ref = $firebaseObject(firebase.database().ref("userWidgets/" + userId + "/" + widgetName));

			ref.$remove()
				.then((res) => {
					console.log(res);
					return res;
				})
				.catch((err) => {
					console.log(err);
				})



		}
	}
}

firebaseService.$inject = ["$firebaseAuth", "$firebaseObject", "userService"];


export default firebaseService;
