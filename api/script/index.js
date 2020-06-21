const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const { mongo_url } = require('../config/index');

// Connect to mongo
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || mongo_url, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Database is connected'))
.catch(err => console.error(`Could not connect to DB ${err}`));

const { generateRoles } = require('./seed');

router.get('/seed/roles', generateRoles);
app.use(router);