import moment from "moment";
import $ from "jquery";


function calendarController($scope, $rootScope, $firebaseObject, toastr){

	// ----------------------
	// moment.js useful stuff
	// ----------------------

	this.thisMonthAsInt 		= parseInt(moment().format("M"));

	this.thisMonth 				= moment();
	this.prevMonth 				= moment(this.thisMonthAsInt - 1,"M");
	this.nextMonth 				= moment(this.thisMonthAsInt + 1,"M");

	this.thisMonthDays			= new Array( this.thisMonth.daysInMonth() );
	this.prevMonthDays			= new Array( this.prevMonth.daysInMonth() );
	this.nextMonthDays			= new Array( this.nextMonth.daysInMonth() );

	this.thisMonthName			= this.thisMonth.format("MMMM");
	this.prevMonthName			= this.prevMonth.format("MMMM");
	this.nextMonthName			= this.nextMonth.format("MMMM");

	// init side scroll in the middle
	$(".interactive-calendar-wrapper").scrollLeft(350);


	this.formShown = false;

	this.showForm = (event) => {

		if (!this.formShown){
			this.formShown = true
		}
		else {
			this.formShown = false;
		}
	}

}

calendarController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default calendarController;