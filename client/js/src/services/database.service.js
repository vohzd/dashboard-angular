"use strict";

function database ($http, $q, $rootScope){

	const wrapper = {
		retrieveProfile: (profileId) => {
			//console.log("received inside service: ", profileId);
			return "message";
		}
	}

	return wrapper;


	/*
	// Object to be returned to Controller
	let parkDBLayer = {

		// POST
		submitNewPark: (payload) => {

			// Saves the skatepark data to the db
			$http.post("/skateparks", payload).success((data) => {

					// the _id will be returned
					$http.get("/skateparks/" + data).success((response) => {

							// Dismiss the open popups
							$rootScope.$emit("destroyPopup");

							// Emit the success to the controller
							$rootScope.$emit("pushLastToScope", response);

							// But also create a new marker
							$rootScope.$emit("parseMarkers", [response]);
						})

				})
				.error((data) => {
					console.log('Error: ' + data);
				});

		},

		// PUT
		updateExistingPark: (id, payload) => {

			// Send put request to server
			$http.put("/skateparks/" + id, payload).success((response) => { 

				console.log(response);
				// no need to return anything...

			});

		}


	};

	*/



}

//allParksSrv.$inject["$http"];

export default database;
