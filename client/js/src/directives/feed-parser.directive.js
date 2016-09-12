import $ from "jquery"; 

function feedParser(backendService){
	
	return {

		"restrict": "E",
		"templateUrl": "../../../views/feed-parser.html",
		"replace": true,
		"scope": {},
		"bindToController": {
			url: "="
		},
		controller(){

			this.allData = [];

			backendService.requestRss(this.url)
				.then((response) => this.parseFeed(response))
				.catch((error) => console.log(error));

			this.parseFeed = (response) => {

				this.allData = response.data;

			}

		},
		"controllerAs": "feedParser"
	}

}

export default feedParser;