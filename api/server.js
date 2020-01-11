const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./database/DB.js')

const PORT = 4000

const postRoute = require('./routes/post.route.js') 
const userRoute = require('./routes/user.route.js') 

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