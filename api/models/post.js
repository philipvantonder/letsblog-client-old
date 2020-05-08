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
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);