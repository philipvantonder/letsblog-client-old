const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	ispublished: {
		type: Boolean,
		default: true
	},
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);