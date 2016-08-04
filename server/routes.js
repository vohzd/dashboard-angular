// Dependencies
const mongoose 			= require('mongoose');
const Profile			= require('./model.js');

// Opens App Routes
module.exports = function(app) {

	/*
		GET Routes
	*/

	// will need work... for now return the internal db id
	app.get("/authenticate/", (req, res) => {
		const query = { "userName": "guest"};
		Profile.findOne(query, (err, doc) => {
			if (err) return res.send(500, { error: err });
			// If no errors are found, return matching record
			res.json(doc._id);
   		 });
	})

	// Retrieve a payload of info about a users profile
	app.get("/userProfile/:id", (req, res) => {

		console.log(req.params.id)
		const query = { "_id": req.params.id};
		Profile.findOne(query, (err, userMetadata) => {
			if (err) return res.send(500, { error: err });
			res.json(userMetadata);
   		 });
	});


	// POST Routes
	// --------------------------------------------------------
	// Provides method for saving new users to the db
	app.post("/userProfile", (req, res) => {

		console.log("body:");
		console.log(req.body);

		// Creates a new skatepark based on the Mongoose Schema
		const newUser = new Profile(req.body);

		console.log("schema: " , newUser);

		// New skatepark is saved to the db
		newUser.save((err) => {
			
			console.log("attempting save...");

			// Test for errors
			if(err) res.send(err);

			// If no errors are found, it responds with the _id of the newly saved obj
			res.json(newUser);
		});
	});

	/*
		PUT ROUTES
	*/

	app.put("/userProfile/:id", (req, res) => {



		console.log(req.body);

		res.json({});

	});






};  