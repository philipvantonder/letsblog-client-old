const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
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
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
}, { timestamps: true });

UserSchema.methods.generatePasswordReset = async function() {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000;
};

UserSchema.methods.resetPassword = async function(password) {
	
	password = await bcrypt.hash(password, 10);
	
	this.password = password;
	this.resetPasswordToken = '';
	this.resetPasswordExpires = '';

};

module.exports = mongoose.model('Users', UserSchema);