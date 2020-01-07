const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./DB.js')
const postRoute = require('./post.route.js') 
const userRoute = require('./user.route.js') 

mongoose.Promise = global.Promise
mongoose.connect(config.DB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Database is connected')
})
.catch(err => {
    console.log('Can not connect to DB ' + err)
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/posts', postRoute)
app.use('/users', userRoute)

app.listen(PORT, function() {
    console.log('Server is running on Port: ', PORT)
})