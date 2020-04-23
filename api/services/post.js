const PostModel = require('../models/post')
const UserService = require('../services/user')
const fs = require('fs');

module.exports = {

	getBlogPost: async (id) => {

		try {

			const post = await PostModel.findOne({ _id: id, isPublished: true });
			
			return { code: 0, message: 'Blog post', post };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	getPublishedBlogPosts: async () => {

		try {

			const posts = await PostModel.find({ isPublished: true }).sort({ createdAt: 'desc' });
			
			return { code: 0, message: 'Published posts', posts };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	getUserPosts: async (token) => {

		try {

			const { user } = await UserService.getUserByToken(token);
			
			const posts = await PostModel.find({ user: user._id });
			
			return { code: 0, message: 'posts', posts: posts };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	create: async (postDTO, token) => {

		try {

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

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	getPost: async (id) => {

		try {

			const post = await PostModel.findById({ _id: id });
	
			return { code: 0, message: 'Post', post: post };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	update: async (id, postDTO) => {

		try {

			const post = await PostModel.findById({ _id: id });

			if (!post) {
				return { code: 1, message: 'Post not found' };
			}

			post.title = postDTO.title;
			post.body = postDTO.body;
			post.isPublished = postDTO.isPublished;

			// check if a new file are being uploaded.
			if (postDTO.fileName !== undefined) {
				post.fileName = postDTO.fileName;
			}

			await post.save();

			return { code: 0, message: 'Post have been updated' };
			
		} catch(error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	delete: async (id) => {

		try {

			const post = await PostModel.findByIdAndRemove({ _id: id });

			return { code: 0, message: 'Post have been removed', post: post };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		} 

	},

	removeUserPostFile: async (post) => {

		try {

			filePath = 'images/' + post.user + '/' + post.fileName;
			
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}

		} catch(error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	},

	unique: async (slug) => {

		try {

			const post = await PostModel.findOne({ slug: slug });

			if (post) {
				return { code: 1, message: 'The Slug exists' };
			}

			return { code: 0, message: 'The Slug is available'  };

		} catch (error) {
			if (error.message) {
				throw new Error(error.message);
			} else {
				throw new Error("Something went wrong.");
			}
		}

	}

};