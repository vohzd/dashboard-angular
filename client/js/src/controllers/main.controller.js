function mainController(dbService){

	// todo determine whether user is logged in
	this.authentication = "guest";

	// set a single source of truth to hold the users current state / metadata
	this.currentUserMeta = null;

	// when page is loaded, grab the meta
	if (this.authentication == "guest"){
		dbService.retrieveProfile("guest_account").then((response) => {
			this.currentUserMeta = response.data;
		})
	}
	else if (this.authentication == "google_user"){
		console.log("loading google profile");
	}

}





export default mainController;