const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Roles', RolesSchema);