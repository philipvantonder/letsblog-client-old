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

		// const testPostCommentsArr = await CommentModel.find({ post: id });

		// function getNestedChildren(arr, parentId) {

		// 	console.log("-----------------");
		// 	console.log(parentId);
		// 	console.log("-----------------");

		// 	var out = [];
		// 	for(var i in arr) {
		// 		if(arr[i].parentId == parentId) {
		// 			console.log("---ID---");
		// 			console.log(arr[i]._id);
		// 			console.log("---ID---");
					
		// 			var children = getNestedChildren(arr, arr[i]._id);

		// 			console.log('---Children---');
		// 			console.log(children);
		// 			console.log('---Children---');
		
		// 			if(children.length) {
		// 				arr[i].children = children;
		// 			}
		// 			out.push(arr[i]);
		// 		}
		// 	}
		// 	return out;
		// }
		
		// console.log(getNestedChildren(testPostCommentsArr));

		// const linkedPostComments = [];
		
		// const testPostCommentsArr = await CommentModel.find({ post: id });
		
		// testPostCommentsArr.forEach(node => {
			
		// 	// No parentId means top level
		// 	if (!node.parentId) return linkedPostComments.push(node);
		
		// 	// Insert node as child of parent in flat array
		// 	const parentIndex = testPostCommentsArr.findIndex(el => el._id === node.parentId);
		
		// 	if (!testPostCommentsArr[parentIndex].children) {
		// 	  	return testPostCommentsArr[parentIndex].children = [node];
		// 	}
		
		// 	testPostCommentsArr[parentIndex].children.push(node);
		// });
		
		// console.log(linkedPostComments);

		const postCommentsArr = await CommentModel.find({ post: id, parentId: null });

		const postComments = [];

		for (let postComment of postCommentsArr) {
			
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