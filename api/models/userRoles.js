const mongoose = require('mongoose');

const UserRoles = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	role: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Roles'
	}
}, { timestamps: true });

module.exports = mongoose.model('UserRoles', UserRoles);