const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: String,
	slug: {
		type: String,
		unique: true
	},
	subcategories: {
		type: Array
	}
}, { timestamps: true });

module.exports = mongoose.model('Categories', CategorySchema);