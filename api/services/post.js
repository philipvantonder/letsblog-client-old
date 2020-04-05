const PostModel = require('../models/post')
const UserService = require('../services/user')
const moment = require('moment');

module.exports = {

	getPublishedPosts: async (id) => {

		let posts = await PostModel.find({ isPublished: true, user: id });

		return  { code: 0, message: 'Published posts', posts };

	},

	getAllPosts: async () => {

		let posts = await PostModel.find();

		return { code: 0, message: 'All posts', posts: posts };

	},

	create: async (postDTO, token) => {

		const { user } = await UserService.getUserByToken(token);

		if (postDTO.isPublished == 'undefined') {
			postDTO.isPublished = false;
		}

		let post = new PostModel({
			title: postDTO.title,
			body: postDTO.body,
			isPublished: postDTO.isPublished,
			fileName: postDTO.filename,
			user: user._id
		})

		let newPost = await post.save();

		return { code: 0, message: 'Post created', post: newPost };

	},

	edit: async (id) => {

		try {

			let post = await PostModel.findById({ _id: id });
	
			return { code: 0, message: 'Post', post: post };

		} catch (error) {
			return { code: 1, message: 'Could not find post', post: post };
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
			post.dateUpdated = moment().format('YYYY-MM-DD hh:mm:ss');

			await post.save();

			return { code: 0, message: 'Post have been updated' };
			
		} catch(error) {
			return { code: 1, message: 'User could not be updated' };
		}

	},

	delete: async (id) => {

		try {

			await PostModel.findByIdAndRemove({ _id: id });
			
			return { code: 0, messasge: 'Post have been removed' };

		} catch (error) {
			return { code: 1, messasge: 'Unable to delete entry' };
		} 

	}

};