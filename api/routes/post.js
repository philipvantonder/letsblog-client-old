const express = require('express')
const postRoutes = express.Router()
const multer = require('multer')
const app = express()
const userAuthentication = require('../middleware/userAuthentication')

var storage = multer.diskStorage({

	destination: function (req, file, cb) {
		cb(null, '../public/images')
	},
	
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
	
})

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

})

let Post = require('../models/post.js')

postRoutes.route('/add').post(fileUpload.single('file'), (req, res) => {

	let post = new Post(req.body)
    post.save().
    then(() => {
        res.status(200).json('Post have been successfully saved')
    })
    .catch(() => {
        res.status(400).send('unable to save to database')
    })
})

app.use((err, req, res, next) =>  {

	if(err.code === "INCORRECT_FILETYPE") {
		res.status(422).json("Only images are allowed")
	}

	if(err.code === "LIMIT_FILE_SIZE") {
		res.status(422).json("Allowed file size is 2MB")
	}

})

postRoutes.route('/').get(userAuthentication.isLoggedIn, (req, res) => { 	

    Post.find(function(err, posts) {
        if (err) {
            res.json(err)
        } else {
            res.json(posts)
        }
    })

})

postRoutes.route('/edit/:id').get(userAuthentication.isLoggedIn, (req, res) => {

    let { id } = req.params;

    Post.findById(id, function(err, post) {
        if (err) {
            res.json(err)
        } else {
            res.json(post)
        }
    })

})

postRoutes.route('/update/:id').post((req, res) => {

    Post.findById(req.params.id, function(err, post) {

        if (!post) {

            res.status(404).send('data is not found')

        } else {

            post.title = req.body.title
            post.body = req.body.body
            post.save()
            .then(() => {
                res.json('Update complete')
            })
            .catch(() => {
                res.status(400).send('Unable to update the data base')
            })

        }

    })

})

postRoutes.route('/delete/:id').delete((req, res) => {

    Post.findByIdAndRemove({ _id: req.params.id }, function(err) {
     
        if (err) {
            res.json(err)
        } else {
            res.json('Successfully removed')
        }

    })

})

module.exports = postRoutes