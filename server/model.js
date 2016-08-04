// Import the mongoose dependencies
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

// Create a schema
const userProfile = new Schema({
	userName: {type: String},
	userWidgetMeta: {type: Object},
	createdAt: {type: Date, default: Date.now}
});

// Exports the Schema for use elsewhere. The MongoDB collection will be called 'userProfile'
module.exports = mongoose.model("userProfile", userProfile);

