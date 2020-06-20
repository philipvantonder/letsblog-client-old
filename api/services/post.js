const PostsModel = require('../models/posts');
const UsersModel = require('../models/users');
const UserService = require('../services/user');
const fs = require('fs');
const { EntityNotFoundError } = require('../utils/error-handling/custom-errors');
const moment = require('moment');

module.exports = {

	getBlogPost: async (id) => {

		const post = await PostsModel.findOne({ _id: id, isPublished: true });
		
		return { post };

	},

	getBlogPostBySlug: async (slug) => {

		const postObj = await PostsModel.findOne({ slug: slug, isPublished: true });
		
		const AuthorObj = await UsersModel.findById({ _id: postObj.user });

		const post = {
			id: postObj._id,
			body: postObj.body,
			title: postObj.title,
			datePublished: moment(postObj.createdAt).format('MMMM Do YYYY'),
			reviewed: postObj.reviewed,
			authorId: AuthorObj._id,
			authorPicture: AuthorObj.profileImage,
			author: `${AuthorObj.name} ${AuthorObj.surname}`
		};

		return { post };

	},

	getPublishedBlogPosts: async () => {

		const postsArr = await PostsModel.find({ isPublished: true, reviewed: true }).sort({ createdAt: 'desc' });
		
		const posts = [];

		for (let post of postsArr) {

			const AuthorObj = await UsersModel.findById({ _id: post.user });
	
			const postObj = {
				id: post._id,
				body: post.body,
				title: post.title,
				slug: post.slug,
				datePublished: moment(post.createdAt).format('MMMM Do YYYY'),
				reviewed: post.reviewed,
				authorId: AuthorObj._id,
				authorPicture: AuthorObj.profileImage,
				author: `${AuthorObj.name} ${AuthorObj.surname}`
			};

			posts.push(postObj);

		}

		return { posts };

	},

	getUserPosts: async (token) => {

		const { user } = await UserService.getUserByToken(token);
		
		const posts = await PostsModel.find({ user: user.id }).sort({ createdAt: 'desc' });
		
		return { posts };

	},

	create: async (postDTO, token) => {

		let tagsArr = postDTO.tags.split(',');
		
		const { user } = await UserService.getUserByToken(token);

		const post = new PostsModel({
			title: postDTO.title,
			body: postDTO.body,
			fileName: postDTO.filename,
			isPublished: postDTO.isPublished,
			slug: postDTO.slug,
			category: postDTO.category,
			tags: tagsArr,
			user: user.id
		});

		const newPost = await post.save();

		return { post: newPost };

	},

	getPost: async (id) => {

		const post = await PostsModel.findById({ _id: id });

		return { post };

	},

	update: async (id, postDTO) => {

		const post = await PostsModel.findById({ _id: id });

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

		const post = await PostsModel.findByIdAndRemove({ _id: id });

		return { post }; 

	},

	removeUserPostFile: async (post) => {

		filePath = 'images/' + post.user + '/' + post.fileName;
		
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}

	},

	unique: async (postDTO) => {

		const post = await PostsModel.findOne({ slug: postDTO.slug });

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

	updateReview: async(postDTO) => {

		const { id, review } = postDTO;
		
		await PostsModel.updateOne({ _id: id }, {
			$set: {
				reviewed: review
			}
		});

	},

	getPostsforReview: async() => {

		const postsArr = await PostsModel.find().sort({ createdAt: 'desc' });
		
		const posts = [];

		for (let post of postsArr) {

			const AuthorObj = await UsersModel.findById({ _id: post.user });
	
			const postObj = {
				id: post._id,
				body: post.body,
				title: post.title,
				slug: post.slug,
				datePublished: moment(post.createdAt).format('MMMM Do YYYY'),
				reviewed: post.reviewed,
				authorId: AuthorObj._id,
				authorPicture: AuthorObj.profileImage,
				author: `${AuthorObj.name} ${AuthorObj.surname}`
			};

			posts.push(postObj);

		}

		return { posts };

	}

};