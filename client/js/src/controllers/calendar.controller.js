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

	this.newEventLabel = "";
	this.newSpendLabel = "";
	this.newSpendAmount = 0;

	this.formDom = $("<div class='popup'>\
		<form class='calendar-add-form'>\
			<h3>Add new</h3>\
			<p>New Event</p>\
			<input type='text' placeholder='New Event label' ng-model='cal.newEventLabel' \>\
			<p>New Spend</p>\
			<input type='text' placeholder='New spend (label)' ng-model='cal.newSpendLabel' \>\
			<input type='text' placeholder='New spend (amount)' ng-model='cal.newSpendAmount' \>\
			<p>Submit</p>\
			<input type='button' value='add' ng-click='cal.submitNewCalItem()'\>\
		</form>\
	</div>");
	

	this.showForm = (event) => {

		if (!this.formShown){
			this.formShown = true;
			//$(".popup").css({"margin-top": event.y, "margin-left": event.x});

		}
		else {
			this.formShown = false;
		}
	}

	this.submitNewCalItem = () => {
		console.log("this was clicked");

	}



}

calendarController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default calendarController;