/* this is the main reference point for the app, all stuff is effectively pulled into here, and then bundled with jspm */

/* commenting vocabulary:
	SST - Single Source of Truth.
*/

// library imports
import $ from "jquery";
import angular from "angular";
import animate from "angular-animate";
import uiRouter from "angular-ui-router";
import firebase from "firebase";
import angularFire from "angularfire";
import toastr from "toastr";
import toastrTemplate from "toastr/angular-toastr.tpls.js";
import dragscroll from "dragscroll";


// Angular Stuff
// -------------

// services
import backendService from "./services/backend.service.js";
import firebaseService from "./services/firebase.service.js";
import userService from "./services/user.service.js";


// directives
import dashboardHeader from "./directives/dashboard-header.directive.js";
import dashboardSidebar from "./directives/dashboard-sidebar.directive.js";

// controllers
import mainController from "./controllers/main.controller.js";
import todoController from "./controllers/todo.controller.js";
import calendarController from "./controllers/calendar.controller.js";
import feedController from "./controllers/feed.controller.js";


// GO
angular.module("dashboardApp", ["ngAnimate", "ui.router", "firebase", "toastr", "ng-drag-scroll"])
	.controller("mainController", mainController)
	.directive("dashboardHeader", dashboardHeader)
	.directive("dashboardSidebar", dashboardSidebar)
	.service("firebaseService", firebaseService)
	.service("backendService", backendService)
	.service("userService", userService)
	.config(($stateProvider, $urlRouterProvider, $locationProvider, toastrConfig) => {

		// allow that annoying hashbang to be removed
		$urlRouterProvider.otherwise('/todo');
		$locationProvider.html5Mode(true);

		// routes
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
			/* on hold. spotify don't allow full track streaming
			.state("media",{
				url : "/media",
				templateUrl: "../../views/widget-media.html",
			})
			*/
			.state("calendar",{
				url : "/calendar",
				templateUrl: "../../views/widget-calendar.html",
				controller: calendarController,
				controllerAs: "cal"
			})
			.state("health",{
				url : "/health",
				templateUrl: "../../views/widget-health.html",
			})

		// configuration for toast notifications
		angular.extend(toastrConfig, {

			progressBar: true,
			timeOut: 800,
			maxOpended: 1,
			preventDuplicates: true,
			positionClass: "toast-bottom-left"

		});

	});

