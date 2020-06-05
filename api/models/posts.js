const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
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
		ref: 'Users',
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Categories',
		default: null
	},
	tags: {
		type: Array
	},
	reviewed: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

module.exports = mongoose.model('Posts', PostsSchema);