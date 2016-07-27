// Dependencies
const mongoose 			= require('mongoose');
const model				= require('./model.js');

// Opens App Routes
module.exports = function(app) {

	/*
		GET Routes
	*/

	// Retrieve a payload of info about a users profile
	app.get('/userProfile', (req, res) => {

		// Uses Mongoose schema to run the search (empty conditions)
		const query = model.find({});

		// Execute
		query.exec((err, userMetadata) => {

			// Test for errors
			if(err)	res.send(err);

			// If no errors are found, it responds with a JSON of all skateparks
			res.json(userMetadata);
		});
	});

};  