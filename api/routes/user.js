const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

var BCRYPT_SALT_ROUNDS = 12

let User = require('../models/user.js')

// User login
router.route('/login').post(function(req, res) {	

	let { email, password } = req.body

	User.findOne({ email: email })
	.then(user => {

		if (!user) {
			
			res.status(200).send({ 
				code: 1, 
				message: 'Username or password is incorrect' 
			})

		}

		bcrypt.compare(password, user.password, (err, isMatch) => {

			if (err) res.status(500) 

			if (isMatch) {

				let jwt_token = jwt.sign({ userId: user._id }, 'sxerpoys01key7K983JjJ75643DD2')

				res.status(200).send({ 
					code: 0, 
					message: 'Logged in', 
					token: jwt_token 
				})

			} else {

				res.status(200).send({ 
					code: 1, 
					message: 'Username or password is incorrect' 
				})

			}

		})

	})
	.catch(() => res.send(400))

	
})

// User Registration
router.route('/register').post(function(req, res) {
	
	bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).
	then(hashed_password => {
	
		let post = new User({
			'name': req.body.name,
			'surname': req.body.surname,
			'email': req.body.email,
			'password': hashed_password
		})
		
		post.save()

	})
	.then(() => {

        res.status(200).json({ 
			code: 0, 
			message: 'Registration successfully'
		})

    })
    .catch(() => {
        res.status(400)
	})
	
})

module.exports = router