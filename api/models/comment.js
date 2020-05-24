const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	ispublished: {
		type: Boolean,
		default: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);