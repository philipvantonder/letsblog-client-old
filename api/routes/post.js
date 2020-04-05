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
			let fileName = originalname.split('.')[0];
			let fileExtension = originalname.split('.')[1];
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

postRoutes.route('/add').post(userAuthentication.isLoggedIn, fileUpload.single('file'), async (req, res) => {

	let token = req.headers['authorization'];

	const userDTO = { ...req.body, ...req.file };

	let { code, message, post } = await PostService.create(userDTO, token);

	res.send({ code, message, post });

})

postRoutes.route('/image/:id/:file').get((req, res) => {

	let { id, file } = req.params

	fileDir = 'images/' + id + '/' + file

	res.sendFile(path.join(__dirname, '../' + fileDir))

});

postRoutes.route('/').get(userAuthentication.isLoggedIn, async (req, res) => { 	

	let token = req.headers['authorization'];

	let { code, message, posts } = await PostService.getAllPosts(token);

	res.send({ code, message, posts });

});

postRoutes.route('/published').get(userAuthentication.isLoggedIn, async (req, res) => { 	

	let token = req.headers['authorization'];

	let { user } = await UserService.getUserByToken(token);

	let { code, message, posts } = await PostService.getPublishedPosts(user._id)

	res.send({ code, message, posts })
})

postRoutes.route('/edit/:id').get(userAuthentication.isLoggedIn, async (req, res) => {

    let { id } = req.params;

	let { code, message, post } = await PostService.edit(id);

	res.send({ code, message, post });

})

postRoutes.route('/update/:id').post(userAuthentication.isLoggedIn, (req, res) => {
	
	let { id } = req.params;

	let { code, message } = PostService.update(id, req.body);

	res.send({ code, message });
	
})

postRoutes.route('/delete/:id').delete(userAuthentication.isLoggedIn, async (req, res) => {

	let { id } = req.params;

	let { code, message } = await PostService.delete(id);

	res.send({ code, message });

})

module.exports = postRoutes