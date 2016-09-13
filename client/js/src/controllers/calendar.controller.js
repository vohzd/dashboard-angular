import moment from "moment";
import $ from "jquery";


function calendarController($scope, $rootScope, $firebaseObject, toastr){

	// ----------------------
	// moment.js useful stuff
	// ----------------------

	this.thisMonthAsInt 		= parseInt(moment().format("M"));
	this.isoDateToday 			= moment().format("YYYY-MM-DD");

	this.thisMonth 				= moment();
	this.prevMonth 				= moment(this.thisMonthAsInt - 1,"M");
	this.nextMonth 				= moment(this.thisMonthAsInt + 1,"M");

	this.thisMonthId 			= moment(this.thisMonth).format("YYYY-MM");
	this.prevMonthId 			= moment(this.prevMonth).format("YYYY-MM");
	this.nextMonthId 			= moment(this.nextMonthId).format("YYYY-MM");

	this.thisMonthDays			= new Array( this.thisMonth.daysInMonth() );
	this.prevMonthDays			= new Array( this.prevMonth.daysInMonth() );
	this.nextMonthDays			= new Array( this.nextMonth.daysInMonth() );

	this.thisMonthName			= this.thisMonth.format("MMMM");
	this.prevMonthName			= this.prevMonth.format("MMMM");
	this.nextMonthName			= this.nextMonth.format("MMMM");

	// init side scroll in the middle
	$(".interactive-calendar-wrapper").scrollLeft(420);

	// view state variables
	this.formShown = false;
	this.formStyle = "hide-form";

	// model stores
	this.newEventLabel = "";
	this.newSpendLabel = "";
	this.newSpendAmount = null;
	this.selectedCell = null;

	// highlight todays date
	this.isTodaysDate = (cellToCheck) => {
		if (this.isoDateToday === cellToCheck){
			return "todays-cell";
		}
	}

	// fired when double clicked on the view
	this.showForm = (event) => {
		if (!this.formShown){
			this.formShown = true;
			this.formStyle = "show-form";
			this.selectedCell = event.target.id;
		}
		else {
			this.formStyle = "hide-form";
			this.formShown = false;
			this.selectedCell = null;
		}
	}

	this.submitNewCalItem = () => {

		/* 
			Needs to do the following;
			grab event label (if it exists)
			grab spending amount & quantity (if it exists)
			find out which cell of which month was clicked
			submit to db under the associated key
		*/

		if (this.newEventLabel || (this.newSpendLabel && this.newSpendAmount)){

			if (this.newEventLabel){

				let payload = {
					added: Date.now(),
					cell: this.selectedCell,
					title: this.newEventLabel
				}

				$rootScope.$emit("createNewWidgetRecordForUser", "calendarEvent", payload);
			}

			/*

			const payload = {
				[this.selectedCell] : {
					event: {
						label: this.newEventLabel ? this.newEventLabel : null
					},
					spend: {
						label: this.newSpendLabel ? this.newSpendLabel : null,
						amount: this.newSpendAmount ? this.newSpendAmount : null
					}
				}
			}

			// todo, clear form and dismiss

			console.log(payload);

			$rootScope.$emit("writeToFirebase", "calendar", payload);

			*/

		}
		else {
			toastr.info("Please fill out the form");
		}
	}

}

calendarController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default calendarController;