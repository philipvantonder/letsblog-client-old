const mongoose = require('mongoose');
const crypto = require('crypto');

let UserSchema = new mongoose.Schema({
    name: {
        type: String,
		required: true,
    },
    surname: {
		type: String,
		required: true,
    },
    email: {
		type: String,
		required: true,
		unique: true
	},
	cellnumber: {
		type: String,
		default: null
	},
	bio: {
		type: String,
		default: ''
	},
    password: {
		type: String,
		required: true,
	},
	profileImage: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
		required: false
	},
	resetPasswordExpires: {
		type: Date,
		required: false
	}
}, { timestamps: true });

UserSchema.methods.generatePasswordReset = function() {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000;
};

module.exports = mongoose.model('User', UserSchema);