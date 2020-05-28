const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null
	},
	ispublished: {
		type: Boolean,
		default: true
	},
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);