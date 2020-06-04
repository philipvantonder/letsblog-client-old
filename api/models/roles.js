const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Roles', RoleSchema);