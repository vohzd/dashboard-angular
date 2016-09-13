function calendarCellDetailer(){
	
	return {

		"restrict": "E",
		"templateUrl": "../../../views/calendar-cell-detailer.html",
		"replace": true,
		"scope": {},
		"bindToController": {
			meta: "="
		},
		controller(){

			console.log("hello");
			console.log(this);

		},
		"controllerAs": "calendarCellDetailer"
	}

}

export default calendarCellDetailer;