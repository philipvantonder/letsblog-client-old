const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
	body: String,
	slug: {
		type: String,
		unique: true
	},
	isPublished: {
		type: Boolean,
		default: false,
	},
	fileName: String,
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	},
	category: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Categories' 
	},
	tags: {
		type: Array
	},
	reviewed: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);