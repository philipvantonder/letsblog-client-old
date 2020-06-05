const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Posts',
		required: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comments',
		default: null
	},
	ispublished: {
		type: Boolean,
		default: true
	},
}, { timestamps: true });

module.exports = mongoose.model('Comments', CommentsSchema);