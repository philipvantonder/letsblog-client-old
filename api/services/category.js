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

		let parent_arr = await CategoryModel.find({ parentId: null });
		
		let category_arr = [];
		
		for (let parent in parent_arr) {

			let category = parent_arr[parent];

			let subcategory_arr = await CategoryModel.find({ parentId: category._id });

			categoryObj = {
				category,
				subcategory: subcategory_arr
			};

			category_arr.push(categoryObj);

		}

		return { code: 0, categories: category_arr };

	},

	addCategory: async (postDTO) => {

		const category = new CategoryModel({
			name: postDTO.categoryName,
			slug: postDTO.categorySlug,
			subcategories: postDTO.subcategoryArr
		});

		const newCategory = await category.save();

		if (postDTO.subcategoryArr.length > 0) {

			for (let subcategoryDetails in postDTO.subcategoryArr) {

				let subcategory = postDTO.subcategoryArr[subcategoryDetails];

				let newSubcategory = new CategoryModel({
					name: subcategory.name,
					slug: subcategory.slug,
					parentId: newCategory._id,
				});

				await newSubcategory.save();

			}

		}

		return { code: 0, message: 'Category have been added' };

	},

	removeCategory: async(id) => {

		let subCategories = await CategoryModel.find({ parentId: id });
		
		if (subCategories.length > 0) {
			for (subcategory of subCategories) {
				await CategoryModel.findByIdAndRemove({ _id: subcategory._id });
			}
		}

		await CategoryModel.findByIdAndRemove({ _id: id });

		return { code: 0, message: 'Category have been removed' }; 

	},

	getCategory: async(id) => {

		let parent_arr = await CategoryModel.find({ _id: id });
		
		for (let parent in parent_arr) {

			let category = parent_arr[parent];

			let subcategory_arr = await CategoryModel.find({ parentId: category._id });

			categoryObj = {
				category,
				subcategory: subcategory_arr
			};

		}

		return { code: 0, message: 'Single category result', category: categoryObj }; 

	},

	update: async(postDTO) => {
		
		await CategoryModel.updateOne({ _id: postDTO.id }, {
			$set: {
				name: postDTO.categoryName,
				slug: postDTO.categorySlug,
			}
		});

		for (subcategory of postDTO.subcategoryArr) {

			// Add new Category
			if (typeof subcategory.parentId === 'undefined') {

				let newCategory = new CategoryModel({
					name: subcategory.name,
					slug: subcategory.slug,
					parentId: postDTO.id
				});

				await newCategory.save();

			} else {

				await CategoryModel.updateOne({ _id: subcategory._id }, {
					$set: {
						name: subcategory.name,
						slug: subcategory.slug
					}
				});

			}

		}

		return { code: 0, message: 'Category have been updated' }; 

	}

};