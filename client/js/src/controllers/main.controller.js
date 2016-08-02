function mainController($rootScope, dbService, subscriptionFactory){

	// ----------------------------------------------------------------
	// BOOTSTRAPPING
	// -------------

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

	// ----------------------------------------------------------------------
	// ASYNC EVENTS
	// ------------

	/* 
		updateUserMeta
		--------------
		Used to overwrite the existing scope meta with a duplicated version provided by
		the individual controller a level down (because each controller will need to 
		implement its own logic/properties).
	*/
	$rootScope.$on("updateUserMeta", (event, payload) => {
		// arrow functions are great because they auto bind 'this' into this functions scope
		console.log(payload);
		console.log(this.currentUserMeta);
	});

	/*
		request scopeSnapshot
		---------------------
		Because the currentUserMeta SST will be a huge block of json, 
		just fire down the relevant bits down to the child controller
	*/

	// todo
	$rootScope.$on("requestScopeSnapshot", (event, payloadObj) => {
		
		const scope = this.currentUserMeta.userWidgetMeta;

		if (scope.hasOwnProperty(payloadObj.targetProperty)){

			subscriptionFactory.broadcast({
				"requestedAction": payloadObj.listenerCallback,
				"targetProperty": null,
				"listenerCallback": null,
				"transportedPayload": scope[payloadObj.targetProperty]
			})


			//subscriptionFactory.emit(payloadObj.listenerCallback, scope[payloadObj.targetProperty]);
			//subscriptionFactory.broadcast(payloadObj.listenerCallback, scope[payloadObj.targetProperty]);
		}
		else {
			console.log("tah");
			console.log("no match");
		}

	});


}





export default mainController;