module.exports = (app) => {

	app.get("/*", (req, res) => {
		res.sendFile(express.static(__dirname + "/client/index.html"));
	})

}