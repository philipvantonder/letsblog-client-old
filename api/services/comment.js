const CommentModel = require('../models/comment');

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

		const postComments = await CommentModel.find({ post: id });

		return { postComments }

	}

}