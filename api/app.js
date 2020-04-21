const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');

const cors = require('cors');
const app = express();

const { port, mongo_url } = require('./config/index');

// Connect to mongo
mongoose.Promise = global.Promise
mongoose.connect(mongo_url, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Database is connected'))
.catch(err => console.error(`Could not connect to DB ${err}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);

app.listen(port, function() {
    console.log(`Server listenig at: http://localhost:${port}`);
})
