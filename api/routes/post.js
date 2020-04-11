const PostService = require('../services/post');
const UserService = require('../services/user');

const fs = require('fs');
const express = require('express');
const path = require('path');
const multer = require('multer');
const userAuthentication = require('../middleware/userAuthentication');

const postRoutes = express.Router();
const app = express();

var postsImageDir;

var storage = multer.diskStorage({

	destination: async function (req, file, cb) {

		let token = req.headers['authorization'];

		let { user } = await UserService.getUserByToken(token);

		postsImageDir = 'images/' + user._id

		if (!fs.existsSync(postsImageDir)) {
			fs.mkdirSync(postsImageDir, { recursive: true })
		}

		cb(null, postsImageDir + '/')
		
	},
	
	filename: function (req, file, cb) {

		var originalname = file.originalname;
		if (fs.existsSync(postsImageDir + '/' + originalname)) {
			let fileName = path.parse(originalname).name;
			let fileExtension = path.parse(originalname).ext;
			originalname = fileName + '-' + Date.now() + '.' + fileExtension
		}

		cb(null, originalname) 
	}
	
});

const fileFilter = (req, file, cb) => {

	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']

	if (!allowedTypes.includes(file.mimetype)) {
		const error = new Error('Incorrect file type')
		error.code = "INCORRECT_FILETYPE"

		return cb(error, false)
	}

	cb(null, true)

}

const fileUpload = multer({ 
	
	storage: storage, 
	
	fileFilter,
	
	limits: {

		fileSize: 500000

	}

});

// app.use((err, req, res, next) =>  {

// 	if(err.code === "INCORRECT_FILETYPE") {
// 		res.status(422).json("Only images are allowed")
// 	}

// 	if(err.code === "LIMIT_FILE_SIZE") {
// 		res.status(422).json("Allowed file size is 2MB")
// 	}

// })

// Get posts that are linked to a user
postRoutes.route('/user').get(userAuthentication.isLoggedIn, async (req, res) => { 	

	let token = req.headers['authorization'];

	let { code, message, posts } = await PostService.getUserPosts(token);

	res.send({ code, message, posts });

});

// Get single blog post
postRoutes.route('/blogPost/:id').get(async (req, res) => { 	

	let { id } = req.params;

	let { code, message, post } = await PostService.getBlogPost(id);

	res.send({ code, message, post });

});

// Create new post
postRoutes.route('/create').post(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {

	let token = req.headers['authorization'];

	const userDTO = { ...req.body, ...req.file };

	let { code, message, post } = await PostService.create(userDTO, token);

	res.send({ code, message, post });

})

// fetch blog post image
postRoutes.route('/image/:id/:file').get((req, res) => {

	let { id, file } = req.params

	fileDir = 'images/' + id + '/' + file

	res.sendFile(path.join(__dirname, '../' + fileDir))

});

// Get all published posts
postRoutes.route('/publishedBlogs').get(async (req, res) => {

	let { code, message, posts } = await PostService.getPublishedBlogPosts();

	res.send({ code, message, posts })
})

// get single blog post
postRoutes.route('/post/:id').get(userAuthentication.isLoggedIn, async (req, res) => {
	
	let { id } = req.params;
	
	let { code, message, post } = await PostService.getPost(id);
	
	res.send({ code, message, post });
	
})

// Update blog post
postRoutes.route('/update/:id').put(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {
	
	let { id } = req.params;

	let { code, message } = await PostService.update(id, req.body);

	res.send({ code, message });
	
})

// Delete blog post
postRoutes.route('/delete/:id').delete(userAuthentication.isLoggedIn, async (req, res) => {

	let { id } = req.params;

	let { code, message, post } = await PostService.delete(id);

	if (code === 0) {
		await PostService.removeUserPostFile(post);
	}

	res.send({ code, message });

})

module.exports = postRoutes