// library imports
import angular from "angular";
import firebase from "firebase";
import angularFire from "angularfire";

// a factory that allows config sharing
import firebaseAuthFactory from "./factories/firebase-auth.factory.js";

// a shared service for client persistence
import currentUserService from "./services/current-user.service.js";

// bootstrap angular app
import LoginController from "./controllers/login.controller.js";

angular.module("dashboardApp", ["firebase"])
	.controller("LoginController", LoginController)
	.factory("firebaseAuthFactory", firebaseAuthFactory)
	.service("currentUserService", currentUserService)