const PostModel = require('../models/post');
const CategoriesModel = require('../models/categories');
const UserService = require('../services/user');
const fs = require('fs');

module.exports = {

	getBlogPost: async (id) => {

		const post = await PostModel.findOne({ _id: id, isPublished: true });
		
		return { code: 0, message: 'Blog post', post };

	},

	getBlogPostBySlug: async (slug) => {

		const post = await PostModel.findOne({ slug: slug, isPublished: true });
		
		return { code: 0, message: 'Blog post', post };

	},

	getPublishedBlogPosts: async () => {

		const posts = await PostModel.find({ isPublished: true }).sort({ createdAt: 'desc' });
		
		return { code: 0, message: 'Published posts', posts };

	},

	getUserPosts: async (token) => {

		const { user } = await UserService.getUserByToken(token);
		
		const posts = await PostModel.find({ user: user._id }).sort({ createdAt: 'desc' });
		
		return { code: 0, message: 'posts', posts: posts };

	},

	create: async (postDTO, token) => {

		const { user } = await UserService.getUserByToken(token);

		const post = new PostModel({
			title: postDTO.title,
			body: postDTO.body,
			fileName: postDTO.filename,
			isPublished: postDTO.isPublished,
			slug: postDTO.slug,
			user: user._id
		})

		const newPost = await post.save();

		return { code: 0, message: 'Post created', post: newPost };

	},

	getPost: async (id) => {

		const post = await PostModel.findById({ _id: id });

		return { code: 0, message: 'Post', post: post };

	},

	update: async (id, postDTO) => {

		const post = await PostModel.findById({ _id: id });

		if (!post) {
			return { code: 1, message: 'Post not found' };
		}

		post.title = postDTO.title;
		post.body = postDTO.body;
		post.isPublished = postDTO.isPublished;
		post.slug = postDTO.slug;
		
		// check if a new file are being uploaded.
		if (postDTO.fileName !== undefined) {
			post.fileName = postDTO.fileName;
		}

		await post.save();

		return { code: 0, message: 'Post have been updated' };

	},

	delete: async (id) => {

		const post = await PostModel.findByIdAndRemove({ _id: id });

		return { code: 0, message: 'Post have been removed', post: post }; 

	},

	removeUserPostFile: async (post) => {

		filePath = 'images/' + post.user + '/' + post.fileName;
		
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

	},

	unique: async (postDTO) => {

		const post = await PostModel.findOne({ slug: postDTO.slug });

		if (post && postDTO.id) {
			if ((postDTO.id == post._id) && (postDTO.slug == post.slug)) {
				return { code: 0, newSlug: post.slug };
			}
		}

		if (post) {

			const newSlugVal = postDTO.slug + Math.floor((Math.random() * 100000) + 1);

			return { code: 0, newSlug: newSlugVal };
		}

		return { code: 0, newSlug: postDTO.slug };

	},

	uniqueCategory: async (postDTO) => {

		const category = await CategoriesModel.findOne({ slug: postDTO.slug });

		if (category) {

			const newSlugVal = postDTO.slug + Math.floor((Math.random() * 100000) + 1);

			return { code: 0, newSlug: newSlugVal };
		}

		return { code: 0, newSlug: postDTO.slug };

	},

	getCategories: async () => {

		const categories = await CategoriesModel.find();

		return { code: 0, categories };

	},

	addCategory: async (postDTO) => {

		const category = new CategoriesModel({
			name: postDTO.name,
			slug: postDTO.slug,
		});

		await category.save();

		return { code: 0, message: 'Category added' };

	}

};