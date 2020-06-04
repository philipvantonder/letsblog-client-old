const mongoose = require('mongoose');

const UserRoles = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Roles'
	}
}, { timestamps: true });

module.exports = mongoose.model('UserRoles', UserRoles);