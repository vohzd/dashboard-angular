function firebaseUiConfig(){

	return {
		"signInSuccessUrl": "/",
		"signInOptions": [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			//firebase.auth.GithubAuthProvider.PROVIDER_ID,
			//firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		"tosUrl": "/null",
	}

}

export default firebaseUiConfig;