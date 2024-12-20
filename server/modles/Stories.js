const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoriesSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	feedback: {
		type: String,
		required: true
	}
});

const StoriesModel = mongoose.model('Stories', StoriesSchema);

module.exports = StoriesModel;
