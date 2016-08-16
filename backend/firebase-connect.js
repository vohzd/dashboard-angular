// Dependencies
const firebase	     	= require("firebase");

const fbInst = firebase.initializeApp({
	serviceAccount: __dirname + "/keys/master-key.json",
	databaseURL: "https://ulti-dashboard.firebaseio.com/"
});

module.exports = fbInst;

