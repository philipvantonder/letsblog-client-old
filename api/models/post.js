const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Post = new Schema({
    title: String,
    body: String,
	isPublished: {
		type: Boolean,
		default: false,
	},
	dateAdded: {
		type: Date, 
		default: Date.now()
	},
	fileName: String,
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User' 
	}
})

module.exports = mongoose.model('Post', Post)