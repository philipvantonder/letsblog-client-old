const PostRoute = require('./routes/post');
const UserRoute = require('./routes/user');
const CategoryRoute = require('./routes/category');
const CommentRoute = require('./routes/comment');

app.use('/api/posts', PostRoute);
app.use('/api/users', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/comment', CommentRoute);