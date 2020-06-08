const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const morgan = require('morgan');

const PostRoute = require('./routes/post');
const UserRoute = require('./routes/user');
const CategoryRoute = require('./routes/category');
const CommentRoute = require('./routes/comment');
const RoleRoute = require('./routes/userRole');

const { port, mongo_url } = require('./config/index');
const { errorHandlingMiddleware } = require('./utils/error-handling/error-handling-middleware');

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

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/api/posts', PostRoute);
app.use('/api/users', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/userRole', RoleRoute);

app.use(errorHandlingMiddleware);

app.listen(process.env.PORT || port, function() {
    console.log(`Server listenig at: http://localhost:${port}`);
});
