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

			setTimeout(() => {
				console.log(this.meta);
			}, 1000)

		},
		"controllerAs": "calendarCellDetailer"
	}

}

export default calendarCellDetailer;