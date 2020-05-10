const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
	subcategoryName: {
		type: String
	}
});

const CategorySchema = new mongoose.Schema({
	name: String,
	slug: {
		type: String,
		unique: true
	},
	subcategories: [subCategorySchema]
}, { timestamps: true });

module.exports = mongoose.model('Categories', CategorySchema);