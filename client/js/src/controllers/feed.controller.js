import $ from "jquery";

function feedController($q, $scope, $rootScope, $firebaseObject, backendService, toastr){

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

	// show the add new feed source form at the side

	this.revealFeedAddForm = () => {

		$(".hidden-form form").fadeToggle();
		$(".hidden-form").toggleClass("wide-form");
		$(".feed-list").toggleClass("list-smaller");

		// toggle between open and close font
		if ($("#toggleFeedAddFormIcon").hasClass("fa-plus")){
			$("#toggleFeedAddFormIcon").removeClass("fa-plus");
			$("#toggleFeedAddForm").addClass("tool-circle-active");
			$("#toggleFeedAddFormIcon").addClass("fa-times");
		}
		else {
			$("#toggleFeedAddFormIcon").removeClass("fa-times");
			$("#toggleFeedAddForm").removeClass("tool-circle-active");
			$("#toggleFeedAddFormIcon").addClass("fa-plus");
		}

	}


	this.addNewFeedSource = () => {
		// TODO, UNIT TEST THE SHIT OUTTA THIS
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
				$rootScope.$emit("createNewWidgetRecordForUser", "feedSource", newSource);

			}
		}
	}

}

feedController.$inject = ["$q", "$scope", "$rootScope", "$firebaseObject", "backendService", "toastr"];


export default feedController;