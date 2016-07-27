function MainCtrl($scope, dbSrv){

	this.authentication = "guest";

	if (this.authentication == "guest"){

		let res = dbSrv.retrieveProfile("guest_account");

		console.log(res);
		
		/*
		dbSrv.retrieveProfile("guest_account").then((response) => {

			console.log(response);

		})
		*/
	}
	else if (this.authentication == "google_user"){
		console.log("loading google profile");
	}

}





export default MainCtrl;