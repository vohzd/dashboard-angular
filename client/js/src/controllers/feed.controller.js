
function feedController($scope, $rootScope, $firebaseObject, toastr){

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
			serverTransactionInProcess = true;
			let dataToParse = $scope.$parent.userWidgetMeta.feed;

			console.log("go and parse");
			console.log(dataToParse);
		}
		else {
			return false;
		}

	}



}

feedController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default feedController;