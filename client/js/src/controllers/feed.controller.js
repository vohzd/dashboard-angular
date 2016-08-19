
function feedController($scope, $rootScope, $firebaseObject, backendService, toastr){

	// -----------
	// INIT
	// ----
	$rootScope.$on("widgetScopeUpdated", () => {
		parseExistingSources();
	});

	// ---------------
	// MODEL
	// -----

	this.sourceName = "";
	this.sourceURL = "";

	// --------------------
	// HELPERS
	// -------

	this.validURL = (urlStr) => {
		const pattern = new RegExp(/^https?:\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/);

		if(!pattern.test(urlStr)){
			return false;
		} 
		else {
			return true;
		}
	}

	// -----------------------------
	// LISTENERS
	// ---------

	this.addNewFeedSource = () => {

		if (!this.sourceName || !this.sourceURL){
			toastr.info("Please enter something :)", "Empty");
		}
		else {
			if (!this.validURL(this.sourceURL)){
				toastr.info("Please enter a valid URL :)", "Empty");
			}
			else {
				const newSource = {
					title: this.sourceName,
					url: this.sourceURL
				};

				// reset
				this.sourceName = "";
				this.sourceURL = "";

				// write todo to db, angularfire will take care of the rest
				$rootScope.$emit("writeToFirebase", "feed", newSource);

			}
		}
	}

	// ----------------
	// FEED PARSING
	// ------------

	let serverTransactionInProcess = false;

	function parseExistingSources() {
		// accesses the scope and gets the server to convert the url into a chunk of metadata

		// because my own mongodb instance is now involved, throttle the connection to occur every 10 seconds
		// if any other requests to this function are received (for which there will be about 5/6 because firebase is calling it lots)
		// then discard them and only do a server request for one
		if (!serverTransactionInProcess){

			console.log("wat?");
			// set server to be blocked
			serverTransactionInProcess = true;

			// get the urls
			let dataToParse = $scope.$parent.userWidgetMeta.feed;

			// loop through urls and get the server to grab the feed data they contain 
			for (let key in dataToParse){

				// shorthand
				let url = dataToParse[key].url;

				// a http promise from the server
				backendService.requestNewsData(url)
					.then((response) => {

						if (response.rss.channel){
							dataToParse[key].parsed = response.rss.channel[0].item;
						}
						else {
							console.log("something else.... not sure... take a look and handle");
							console.log(response);
						}

						console.log(dataToParse[key]);

					})
					.catch((error) => {
						console.log(error);
					})
			}

		}
		else {
			return false;
		}

	}



}

feedController.$inject = ["$scope", "$rootScope", "$firebaseObject", "backendService", "toastr"];


export default feedController;