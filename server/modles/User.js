const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
        unique: true
	},
	password: {
		type: String,
		required: true
	},
	resetPasswordToken:
	{
		type:String,
		default: null
	}
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
