const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	name: String,
	slug: {
		type: String,
		unique: true,
		required: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categories',
		default: null
	}
}, { timestamps: true });

module.exports = mongoose.model('Categories', CategorySchema);