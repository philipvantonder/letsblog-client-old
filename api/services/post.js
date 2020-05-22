const PostModel = require('../models/post');
const UserService = require('../services/user');
const fs = require('fs');
const { EntityNotFoundError } = require('../utils/error-handling/custom-errors');

module.exports = {

	getBlogPost: async (id) => {

		const post = await PostModel.findOne({ _id: id, isPublished: true });
		
		return { post };

	},

	getBlogPostBySlug: async (slug) => {

		const post = await PostModel.findOne({ slug: slug, isPublished: true });
		
		return { post };

	},

	getPublishedBlogPosts: async () => {

		const posts = await PostModel.find({ isPublished: true }).sort({ createdAt: 'desc' });
		
		return { posts };

	},

	getUserPosts: async (token) => {

		const { user } = await UserService.getUserByToken(token);
		
		const posts = await PostModel.find({ user: user._id }).sort({ createdAt: 'desc' });
		
		return { posts };

	},

	create: async (postDTO, token) => {

		let tagsArr = postDTO.tags.split(',');
		
		const { user } = await UserService.getUserByToken(token);

		const post = new PostModel({
			title: postDTO.title,
			body: postDTO.body,
			fileName: postDTO.filename,
			isPublished: postDTO.isPublished,
			slug: postDTO.slug,
			category: postDTO.category,
			tags: tagsArr,
			user: user._id
		});

		const newPost = await post.save();

		return { post: newPost };

	},

	getPost: async (id) => {

		const post = await PostModel.findById({ _id: id });

		return { post };

	},

	update: async (id, postDTO) => {

		const post = await PostModel.findById({ _id: id });

		if (!post) {
			throw new EntityNotFoundError('Post', 'Post not found');
		}

		let tagsArr = postDTO.tags.split(',');

		post.title = postDTO.title;
		post.body = postDTO.body;
		post.isPublished = postDTO.isPublished;
		post.slug = postDTO.slug;
		post.category = postDTO.category;
		post.tags = tagsArr;
		
		// check if a new file are being uploaded.
		if (postDTO.fileName !== undefined) {
			post.fileName = postDTO.fileName;
		}

		await post.save();

	},

	delete: async (id) => {

		const post = await PostModel.findByIdAndRemove({ _id: id });

		return { post }; 

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
				return { newSlug: post.slug };
			}
		}

		if (post) {

			const newSlugVal = postDTO.slug + Math.floor((Math.random() * 100000) + 1);

			return { newSlug: newSlugVal };

		}

		return { newSlug: postDTO.slug };

	},

};