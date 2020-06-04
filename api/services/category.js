const CategoryModel = require('../models/categories');
const PostModel = require('../models/post');

module.exports = {

	uniqueCategory: async (postDTO) => {

		const category = await CategoryModel.findOne({ slug: postDTO.slug });

		if (category && postDTO.id) {
			if ((postDTO.id == category._id) && (postDTO.slug == category.slug)) {
				return { newSlug: category.slug };
			}
		}

		if (category) {

			const newSlugVal = postDTO.slug + Math.floor((Math.random() * 100000) + 1);

			return { newSlug: newSlugVal };
		}

		return { newSlug: postDTO.slug };

	},

	getCategoryById: async (id) => {

		let parent_arr = await CategoryModel.find({ _id: id });
		
		let category_arr = [];
		
		for (category of parent_arr) {

			let subcategory_arr = await CategoryModel.find({ parentId: category._id });

			let canRemoveCategory = true;

			const linkedPost = await PostModel.findOne({ category: category._id });

			if (linkedPost) {
				canRemoveCategory = false;
			}

			let newSubCatArr = [];
			for (subcategoryItem of subcategory_arr) {

				canRemoveSubCategory = true;

				const linkedSubPost = await PostModel.findOne({ category: subcategoryItem._id })

				if (linkedSubPost) {
					canRemoveSubCategory = false;
					canRemoveCategory = false;
				}

				subCategoryObj = {
					id: subcategoryItem._id,
					name: subcategoryItem.name,
					slug: subcategoryItem.slug,
					parentId: subcategoryItem.parentId,
					canRemoveSubCategory
				};

				newSubCatArr.push(subCategoryObj);

			}

			categoryObj = {
				category: {
					id: category._id,
					name: category.name,
					slug: category.slug,
					canRemoveCategory
				},
				subcategory: newSubCatArr
			};

			category_arr.push(categoryObj);

		}
		
		return { category: category_arr };

	},

	getCategories: async () => {

		let parent_arr = await CategoryModel.find({ parentId: null });
		
		let category_arr = [];
		
		for (category of parent_arr) {

			let subcategory_arr = await CategoryModel.find({ parentId: category._id });

			let canRemoveCategory = true;

			const linkedPost = await PostModel.findOne({ category: category._id });

			if (linkedPost) {
				canRemoveCategory = false;
			}

			let newSubCatArr = [];
			for (subcategoryItem of subcategory_arr) {

				canRemoveSubCategory = true;

				const linkedSubPost = await PostModel.findOne({ category: subcategoryItem._id })

				if (linkedSubPost) {
					canRemoveSubCategory = false;
					canRemoveCategory = false;
				}

				subCategoryObj = {
					id: subcategoryItem._id,
					name: subcategoryItem.name,
					slug: subcategoryItem.slug,
					canRemoveSubCategory
				};

				newSubCatArr.push(subCategoryObj);

			}

			categoryObj = {
				category: {
					id: category._id,
					name: category.name,
					slug: category.slug,
					canRemoveCategory
				},
				subcategory: newSubCatArr
			};

			category_arr.push(categoryObj);

		}
		
		return { categories: category_arr };

	},

	addCategory: async (postDTO) => {

		const category = new CategoryModel({
			name: postDTO.categoryName,
			slug: postDTO.categorySlug,
			subcategories: postDTO.subcategoryArr
		});

		const newCategory = await category.save();

		if (postDTO.subcategoryArr.length > 0) {

			for (subcategory of postDTO.subcategoryArr) {

				let newSubcategory = new CategoryModel({
					name: subcategory.name,
					slug: subcategory.slug,
					parentId: newCategory._id,
				});

				await newSubcategory.save();

			}

		}

	},

	removeCategory: async(id) => {

		let subCategories = await CategoryModel.find({ parentId: id });
		
		if (subCategories.length > 0) {
			for (subcategory of subCategories) {
				await CategoryModel.findByIdAndRemove({ _id: subcategory._id });
			}
		}

		await CategoryModel.findByIdAndRemove({ _id: id });

	},

	update: async(postDTO) => {
		
		await CategoryModel.updateOne({ _id: postDTO.id }, {
			$set: {
				name: postDTO.categoryName,
				slug: postDTO.categorySlug
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

				await CategoryModel.updateOne({ _id: subcategory.id }, {
					$set: {
						name: subcategory.name,
						slug: subcategory.slug
					}
				});

			}

		}

	},

	getCategoriesBySlug: async (slug) => {

		const category = await CategoryModel.findOne({ slug });

		if (!category) {
			return { posts: [] };
		}

		if (category) {

			const posts = await PostModel.find({ category: category._id, isPublished: true }).sort({ createdAt: 'desc' });
			
			return { posts };
			
		}

	}

};