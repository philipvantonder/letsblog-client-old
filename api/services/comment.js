const CommentModel = require('../models/comment');
const UserModel = require('../models/user');

const moment = require('moment');

module.exports = {

	create: async (postDTO) => {

		const comment = new CommentModel({
			body: postDTO.comment,
			user: postDTO.userId,
			post: postDTO.postId,
		});

		await comment.save();

	},

	getPostCommentsById: async (id) => {

		const postCommentsObj = await CommentModel.find({ post: id });

		const postComments = [];

		for (postComment of postCommentsObj) {
			
			const userObject = await UserModel.findById({ _id: postComment.user });

			let postCommentDetails = {
				commentId: postComment._id,
				commentBody: postComment.body,
				postId: postComment.post,
				createdAt: moment(postComment.createdAt).format('MMMM Do YYYY h:mm:ss a'),
				isPublished: postComment.isPublished,
				userId: userObject._id,
				userName: userObject.name,
				userSurname: userObject.surname,
				userProfileImage: userObject.profileImage,
			};

			postComments.push(postCommentDetails);

		}

		return { postComments };

	},

	addReply: async (postDTO) => {

		console.log(postDTO);

		const comment = new CommentModel({
			body: postDTO.comment,
			user: postDTO.userId,
			post: postDTO.postId,
			parentId: postDTO.commentId,
		});

		await comment.save();

	}

}