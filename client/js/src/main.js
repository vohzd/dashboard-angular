/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

/* commenting vocabulary:
	SST - Single Source of Truth.
*/

// library imports
import $ from "jquery";
import angular from "angular";
import uiRouter from "angular-ui-router";
import firebase from "firebase";
import angularFire from "angularfire";

// Angular Stuff
// -------------

// services
import backendService from "./services/backend.service.js";
import firebaseService from "./services/firebase.service.js";

// directives
import dashboardHeader from "./directives/dashboard-header.directive.js";
import dashboardSidebar from "./directives/dashboard-sidebar.directive.js";

// controllers
import mainController from "./controllers/main.controller.js";
import todoController from "./controllers/todo.controller.js";

// GO
angular.module("dashboardApp", ["ui.router", "firebase"])
	.controller("mainController", mainController)
	.directive("dashboardHeader", dashboardHeader)
	.directive("dashboardSidebar", dashboardSidebar)
	.service("firebaseService", firebaseService)
	.service("backendService", backendService)
	.config(($stateProvider, $urlRouterProvider, $locationProvider) => {

		$urlRouterProvider.otherwise('/todo');
		$locationProvider.html5Mode(true);

		$stateProvider
			.state("todo",{
				url : "/todo",
				templateUrl: "../../views/widget-todo.html",
				controller: todoController,
				controllerAs: "todo"
			})
			.state("feed",{
				url : "/feed",
				templateUrl: "../../views/widget-feed.html",
			})
			.state("media",{
				url : "/media",
				templateUrl: "../../views/widget-media.html",
			})
			.state("calendar",{
				url : "/calendar",
				templateUrl: "../../views/widget-calendar.html",
			})
			.state("health",{
				url : "/health",
				templateUrl: "../../views/widget-health.html",
			})

	});

