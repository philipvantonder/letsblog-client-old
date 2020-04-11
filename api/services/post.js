const PostModel = require('../models/post')
const UserService = require('../services/user')
const moment = require('moment');
const fs = require('fs');

module.exports = {

	getBlogPost: async (id) => {

		try {

			let post = await PostModel.findOne({ _id: id, isPublished: true });
			
			return { code: 0, message: 'Blog post', post };

		} catch (error) {
			return { code: 1, message: 'Could not get post feed' };
		}

	},

	getPublishedBlogPosts: async () => {

		try {

			let posts = await PostModel.find({ isPublished: true });
			
			return { code: 0, message: 'Published posts', posts };

		} catch (error) {
			return { code: 1, message: 'Could not get published posts' };
		}

	},

	getUserPosts: async (token) => {

		try {

			let { user } = await UserService.getUserByToken(token);
			
			let posts = await PostModel.find({ user: user._id });
			
			return { code: 0, message: 'posts', posts: posts };

		} catch (error) {
			return { code: 1, message: 'Could not get posts' };
		}

	},

	create: async (postDTO, token) => {

		try {

			const { user } = await UserService.getUserByToken(token);

			let post = new PostModel({
				title: postDTO.title,
				body: postDTO.body,
				fileName: postDTO.filename,
				isPublished: postDTO.isPublished,
				user: user._id
			})

			let newPost = await post.save();

			return { code: 0, message: 'Post created', post: newPost };

		} catch (error) {
			return { code: 1, message: 'Could not create post' };
		}

	},

	getPost: async (id) => {

		try {

			let post = await PostModel.findById({ _id: id });
	
			return { code: 0, message: 'Post', post: post };

		} catch (error) {
			return { code: 1, message: 'Could not find post' };
		}

	},

	update: async (id, postDTO) => {

		try {

			let post = await PostModel.findById({ _id: id });

			if (!post) {
				return { code: 1, message: 'Post not found' };
			}

			post.title = postDTO.title;
			post.body = postDTO.body;
			post.isPublished = postDTO.isPublished;

			// This means the file was not changed.
			if (postDTO.fileName !== undefined) {
				post.fileName = postDTO.fileName;
			}

			await post.save();

			return { code: 0, message: 'Post have been updated' };
			
		} catch(error) {
			return { code: 1, message: 'User could not be updated' };
		}

	},

	delete: async (id) => {

		try {

			let post = await PostModel.findByIdAndRemove({ _id: id });

			return { code: 0, message: 'Post have been removed', post: post };

		} catch (error) {
			return { code: 1, message: 'Unable to remove post' };
		} 

	},

	removeUserPostFile: async (post) => {

		try {

			filePath = 'images/' + post.user + '/' + post.fileName;
			
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath)
			}

		} catch(error) {
			return { code: 1, message: 'Unable to remove file' };
		}

	}

};