const mongoose = require('mongoose');

// const subCategorySchema = new mongoose.Schema({
// 	subcategoryName: String,
// 	subcategorySlugName: String
// });

// const CategorySchema = new mongoose.Schema({
// 	name: String,
// 	slug: {
// 		type: String,
// 		unique: true
// 	},
// 	subcategories: [subCategorySchema]
// }, { timestamps: true });

const CategorySchema = new mongoose.Schema({
	name: String,
	slug: {
		type: String,
		unique: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categories',
		default: null
	}
}, { timestamps: true });

module.exports = mongoose.model('Categories', CategorySchema);