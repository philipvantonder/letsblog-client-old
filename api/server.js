const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const cors = require('cors')
const mongoose = require('mongoose')
const db = require('./config/DB.js').DB

const postRoute = require('./routes/post') 
const userRoute = require('./routes/user')

const PORT = 4000

// Connect to mongo
mongoose.Promise = global.Promise
mongoose.connect(db, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Database is connected'))
.catch(err => console.error(`Could not connect to DB ${err}`))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/posts', postRoute)
app.use('/users', userRoute)

app.listen(PORT, function() {
    console.log(`Server listenig at: http://localhost:${PORT}`)
})
