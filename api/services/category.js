const CategoryModel = require('../models/category');

module.exports = {

	uniqueCategory: async (postDTO) => {

		const category = await CategoryModel.findOne({ slug: postDTO.slug });

		if (category) {

			const newSlugVal = postDTO.slug + Math.floor((Math.random() * 100000) + 1);

			return { code: 0, newSlug: newSlugVal };
		}

		return { code: 0, newSlug: postDTO.slug };

	},

	getCategories: async () => {

		const categories = await CategoryModel.find();

		return { code: 0, categories };

	},

	addCategory: async (postDTO) => {

		const category = new CategoryModel({
			name: postDTO.name,
			slug: postDTO.slug,
		});

		await category.save();

		return { code: 0, message: 'Category added' };

	},

	removeCategory: async(id) => {

		await CategoryModel.findByIdAndRemove({ _id: id });

		return { code: 0, message: 'Category have been removed' }; 

	}

};