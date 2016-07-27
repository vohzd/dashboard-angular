// Import the mongoose dependencies
const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;

// Create a schema
const userProfile = new Schema({
	userName: {type: String, required: false},
	userWidgetMeta: {type: Array, required: false},
	createdAt: {type: Date, default: Date.now}
});

// Exports the Schema for use elsewhere. The MongoDB collection will be called 'skateparks'
module.exports = mongoose.model("userProfile", userProfile);

