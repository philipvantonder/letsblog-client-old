const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
	comment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comments',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	like: {
		type: Boolean,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Likes', LikesSchema);