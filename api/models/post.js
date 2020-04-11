const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    title: String,
    body: String,
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

module.exports = mongoose.model('Post', Post);