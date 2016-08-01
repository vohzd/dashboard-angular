// Dependencies
const mongoose 			= require('mongoose');
const model				= require('./model.js');

// Opens App Routes
module.exports = function(app) {

	/*
		GET Routes
	*/

	// Retrieve a payload of info about a users profile
	app.get('/userProfile/:id', (req, res) => {

		const accountId = null;

		if (!req.params.id){
			accountId = 1
		}
		else {
			accountId = req.params.id;
		}

		const mockData = {
				accountId: 1,
				userWidgetMeta: {
					"todo": [
						{
							title: "Build this website",
							added: "today"
						},
						{
							title: "Finish this website",
							added: "stfu"
						}
					]
				},
				createdAt: "27/07/2016"
		}

		res.json(mockData);


		/*
		// Uses Mongoose schema to run the search (empty conditions)
		const query = model.find({});

		// Execute
		query.exec((err, userMetadata) => {

			// Test for errors
			if(err)	res.send(err);

			// If no errors are found, it responds with a JSON of all skateparks
			res.json(userMetadata);
		});

		*/
	});



};  