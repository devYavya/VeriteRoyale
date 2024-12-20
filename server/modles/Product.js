const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	imageUrl: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true,
		default: 0
	}
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
