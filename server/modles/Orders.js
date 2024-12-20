const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: [{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true
		},
		quantity: {
			type: Number,
			required: true,
			min: 1
		}
	}],
	totalAmount: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
		default: 'pending'
	},
	shippingAddress: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;
