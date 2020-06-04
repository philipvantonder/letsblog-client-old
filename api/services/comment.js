const CommentModel = require('../models/comment');
const UserModel = require('../models/user');
const LikeModel = require('../models/likes');
const UserService = require('../services/user');

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

		const linkedPostCommentsArr = await CommentModel.find({ post: id });

		const postCommentsArr = [];

		for (let postComment of linkedPostCommentsArr) {

			const userObject = await UserModel.findById({ _id: postComment.user });

			const totalLikes = await LikeModel.find({ comment: postComment._id, like: true }).countDocuments();
			const totalDislikes = await LikeModel.find({ comment: postComment._id, like: false }).countDocuments();

			let postCommentDetails = {
				commentId: postComment._id,
				parentId: postComment.parentId,
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

			postCommentsArr.push(postCommentDetails);

		}

		const postComments = [];

		let totalComments = 0;
		
		postCommentsArr.forEach(node => {
			
			totalComments++;

			// No parentId means top level
			if (!node.parentId) return postComments.push(node);

			// Insert node as child of parent in postCommentsArr
			const parentIndex = postCommentsArr.findIndex(el => el.commentId.toString() === node.parentId.toString());

			if (!postCommentsArr[parentIndex].children) {
				return postCommentsArr[parentIndex].children = [node];
			}
		
			postCommentsArr[parentIndex].children.push(node);

		});

		return { postComments, totalComments };

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

	addLike: async (postDTO, token) => {

		const { user } = await UserService.getUserByToken(token);

		const userId = user.id;

		const getLike = await LikeModel.findOne({ comment: postDTO.commentId, user: userId });

		if (!getLike) {
			
			const like = new LikeModel({
				comment: postDTO.commentId,
				user: userId,
				like: postDTO.value
			});
			
			await like.save();
			
		} else {

			await LikeModel.updateOne({ comment: postDTO.commentId, user: userId }, {
				$set: {
					like: postDTO.value
				}
			});

		}

	},

	getUserCommentLikes: async (token) => {

		const { user } = await UserService.getUserByToken(token);

		const likes = await LikeModel.find({ user: user.id });

		return { likes };

	}

}