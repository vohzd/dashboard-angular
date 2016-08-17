import moment from "moment";

function todoController($scope, $rootScope, $firebaseObject, toastr){

	/*
	angular.forEach(31, () => {
		this.thisMonth.push("blarg")
	});
*/

this.thisMonth = new Array(365);

}

todoController.$inject = ["$scope", "$rootScope", "$firebaseObject", "toastr"];


export default todoController;