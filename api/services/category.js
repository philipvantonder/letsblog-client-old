const CategoryModel = require('../models/category');

module.exports = {

	uniqueCategory: async (postDTO) => {

		const category = await CategoryModel.findOne({ slug: postDTO.slug });

		if (category && postDTO.id) {
			if ((postDTO.id == category._id) && (postDTO.slug == category.slug)) {
				return { code: 0, newSlug: category.slug };
			}
		}

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

		let subcategoriesArr = [];

		if (postDTO.subcategoryArr.length > 0) {
			for (let subcategory in postDTO.subcategoryArr) {
				subcategoriesArr.push(postDTO.subcategoryArr[subcategory].subcategoryname);
			}
		}
		
		const category = new CategoryModel({
			name: postDTO.categoryName,
			slug: postDTO.categorySlug,
			subcategories: subcategoriesArr,
		});

		await category.save();

		return { code: 0, message: 'Category have been added' };

	},

	removeCategory: async(id) => {

		await CategoryModel.findByIdAndRemove({ _id: id });

		return { code: 0, message: 'Category have been removed' }; 

	},

	getCategory: async(id) => {

		const category = await CategoryModel.findById({ _id: id });

		return { code: 0, message: 'Single category result', category }; 

	},

	update: async(postDTO) => {

		let subcategoriesArr = [];

		if (postDTO.subcategoryArr.length > 0) {
			for (let subcategory in postDTO.subcategoryArr) {
				subcategoriesArr.push(postDTO.subcategoryArr[subcategory].subcategoryname);
			}
		}
		
		await CategoryModel.updateOne({ _id: postDTO.id }, {
			$set: {
				name: postDTO.categoryName,
				slug: postDTO.categorySlug,
				subcategories: subcategoriesArr	
			}
		});

		return { code: 0, message: 'Category have been updated' }; 

	}

};