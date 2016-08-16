// Dependencies
const mongoose 			= require('mongoose');
const Profile			= require('./model.js');

// Opens App Routes
module.exports = function(app) {

	// POST
	// ----

	app.post("/authenticateToken", (req, res) => {

	
		console.log("hello!!!");

		console.log(req.body);

		res.json(req.body)

	});


























	
	//	GET Routes
	//	--------------------------------------------------------
	//

	/*
	// Will be pretty commonly called
	// Just exposes an unauthenticated endpoint to return a chunk of json
	// for the guest profile
	app.get("/getGuestProfileId", (req, res) => {
		const query = { "userName": "guest"};
		Profile.findOne(query, (err, doc) => {
			if (err) return res.send(500, { error: err });
			// If no errors are found, return matching record
			res.json(doc._id);
   		 });

	});

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

	// Redirect to the log in route
	app.get("/login", (req, res) => {

		res.sendFile("login.html", { root: __dirname + "/../client/" });

	});

	// POST Routes
	// --------------------------------------------------------
	// Provides method for saving new users to the db
	app.post("/userProfile", (req, res) => {
		const newUser = new Profile(req.body);
		newUser.save((err) => {
			if(err) res.send(err);
			res.json(newUser);
		});
	});

	// PUT ROUTES
	// --------------------------------------------------------
	//

	app.put("/userProfile/:id", (req, res) => {

		// what is the id of the document you want to update?
		const q = { "_id": req.params.id};
		// what is the content you want to update the document with?
		const b = req.body;

		// call findOneAndUpdate with the info required
		Profile.findOneAndUpdate(q, b, (err, doc) => {

			if (err) return res.send(500, { error: err }); // bad times

			res.json(b);

		});

	});

	*/






};  