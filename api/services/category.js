const CategoriesModel = require('../models/categories');
const PostsModel = require('../models/posts');

module.exports = {

	uniqueCategory: async (postDTO) => {

		const category = await CategoriesModel.findOne({ slug: postDTO.slug });

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

		let parent_arr = await CategoriesModel.find({ _id: id });
		
		let category_arr = [];
		
		for (category of parent_arr) {

			let subcategory_arr = await CategoriesModel.find({ parentId: category._id });

			let canRemoveCategory = true;

			const linkedPost = await PostsModel.findOne({ category: category._id });

			if (linkedPost) {
				canRemoveCategory = false;
			}

			let newSubCatArr = [];
			for (subcategoryItem of subcategory_arr) {

				canRemoveSubCategory = true;

				const linkedSubPost = await PostsModel.findOne({ category: subcategoryItem._id })

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

		let parent_arr = await CategoriesModel.find({ parentId: null });
		
		let category_arr = [];
		
		for (category of parent_arr) {

			let subcategory_arr = await CategoriesModel.find({ parentId: category._id });

			let canRemoveCategory = true;

			const linkedPost = await PostsModel.findOne({ category: category._id });

			if (linkedPost) {
				canRemoveCategory = false;
			}

			let newSubCatArr = [];
			for (subcategoryItem of subcategory_arr) {

				canRemoveSubCategory = true;

				const linkedSubPost = await PostsModel.findOne({ category: subcategoryItem._id })

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

		const category = new CategoriesModel({
			name: postDTO.categoryName,
			slug: postDTO.categorySlug,
			subcategories: postDTO.subcategoryArr
		});

		const newCategory = await category.save();

		if (postDTO.subcategoryArr.length > 0) {

			for (subcategory of postDTO.subcategoryArr) {

				let newSubcategory = new CategoriesModel({
					name: subcategory.name,
					slug: subcategory.slug,
					parentId: newCategory._id,
				});

				await newSubcategory.save();

			}

		}

	},

	removeCategory: async(id) => {

		let subCategories = await CategoriesModel.find({ parentId: id });
		
		if (subCategories.length > 0) {
			for (subcategory of subCategories) {
				await CategoriesModel.findByIdAndRemove({ _id: subcategory._id });
			}
		}

		await CategoriesModel.findByIdAndRemove({ _id: id });

	},

	update: async(postDTO) => {
		
		await CategoriesModel.updateOne({ _id: postDTO.id }, {
			$set: {
				name: postDTO.categoryName,
				slug: postDTO.categorySlug
			}
		});

		for (subcategory of postDTO.subcategoryArr) {

			// Add new Category
			if (typeof subcategory.parentId === 'undefined') {

				let newCategory = new CategoriesModel({
					name: subcategory.name,
					slug: subcategory.slug,
					parentId: postDTO.id
				});
				
				await newCategory.save();
				
			} else {

				await CategoriesModel.updateOne({ _id: subcategory.id }, {
					$set: {
						name: subcategory.name,
						slug: subcategory.slug
					}
				});

			}

		}

	},

	getCategoriesBySlug: async (slug) => {

		const category = await CategoriesModel.findOne({ slug });

		if (!category) {
			return { posts: [] };
		}

		if (category) {

			const posts = await PostsModel.find({ category: category._id, isPublished: true }).sort({ createdAt: 'desc' });
			
			return { posts };
			
		}

	}

};