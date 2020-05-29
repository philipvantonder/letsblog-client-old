const CommentModel = require('../models/comment');
const UserModel = require('../models/user');
const LikeModel = require('../models/likes');

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

			const totalLikes = await LikeModel.find({ comment: postComment._id, like: true }).countDocuments();
			const totalDislikes = await LikeModel.find({ comment: postComment._id, like: false }).countDocuments();

			let postCommentDetails = {
				commentId: postComment._id,
				commentBody: postComment.body,
				commentLike: totalLikes,
				commentDislike: totalDislikes,
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

		const comment = new CommentModel({
			body: postDTO.comment,
			user: postDTO.userId,
			post: postDTO.postId,
			parentId: postDTO.commentId,
		});

		await comment.save();

	},

	addLike: async (postDTO) => {

		const getLike = await LikeModel.findOne({ comment: postDTO.commentId, user: postDTO.userId });

		if (!getLike) {
			
			const like = new LikeModel({
				comment: postDTO.commentId,
				user: postDTO.userId,
				like: postDTO.value,
			});
			
			await like.save();
			
		} else {

			await LikeModel.updateOne({ comment: postDTO.commentId, user: postDTO.userId }, {
				$set: {
					like: postDTO.value
				}
			});

		}

	}

}