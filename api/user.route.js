const express = require('express')
const userRoutes = express.Router()

let User = require('./user.model.js')

userRoutes.route('/add').post(function(req, res) {
    let post = new User(req.body)
    post.save().
    then(() => {
        res.status(200).json({ 'user': 'user have been successfully added' })
    })
    .catch(() => {
        res.status(400).send('unable to save to database')
    })
})

module.exports = userRoutes