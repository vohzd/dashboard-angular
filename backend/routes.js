// Dependencies
// set up firebase

const Firebase 			= require("./firebase-connect.js");
const mongoose 			= require("mongoose");
const Profile			= require("./model.js");
const request			= require("request");
const parseString		= require("xml2js").parseString;

// Opens App Routes
module.exports = function(app) {

	// POST
	// ----

	app.post("/authenticateToken", (req, res) => {

		Firebase.auth().verifyIdToken(req.body.accessToken)
			.then((decodedToken) => {
				res.json(decodedToken);
			})
			.catch((error) => {
				res.send(false);
			})

	});	


	// GET
	// ---

	app.get("/parseFeed/*", (req, res) => {

		const urlToFetch = req.params[0];

		request(urlToFetch, (error, response, body) => {

			if (!error && response.statusCode == 200){

				// TODO -- error handling of dodgy xml!!!

				// get headers for content type... might not always be xml thats retreived...
				const dataType = response.headers["content-type"];

				// regex to check
				const isXml = new RegExp(/(xml)/g);

				// check content type is xml with regex
				if (isXml.test(dataType)){

					parseString(body, (err, result) => {

						if (!err){
							res.json(result)
						}

					});

				}
				else {
					console.log("not xml, something else");
				}



			}

		});

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