import { getAxiosInstance } from '@/services/axios/index';

export default {

	async fetchUserPosts() {

		const { data } = await getAxiosInstance('/posts').get('/user');

		return data;

	},

	async fetchBlogPost(id) {

		const { data } = await getAxiosInstance('/posts').get('/blogPost/' + id);

		return data;

	},

	async fetchBlogPostBySlug(slug) {

		const { data } = await getAxiosInstance('/posts').get('/slug/' + slug);

		return data;

	},

	async fetchPublishedBlogPosts() {
			
		const { data } = await getAxiosInstance('/posts').get('/publishedBlogs');

		return data;

	},

	async fetchPost(id) {

		const { data } = await getAxiosInstance('/posts').get('/post/' + id);

		return data;

	},

	async create(postDTO) {

		const { data } = await getAxiosInstance('/posts').post('/create', postDTO,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);

		return data;

	},

	async delete (id) {

		const { data } = await getAxiosInstance('/posts').delete('/delete/' + id);

		return data;

	},

	async update (id, post) {

		const { data } = await getAxiosInstance('/posts').put('/update/' + id, post,
			{
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
		);		

		return data;

	},

	async getImage (post) {

		const { data } = await getAxiosInstance('/posts').get('/image/' + post.user + '/' + post.fileName);

		return data;

	},

	async checkUnique(postDTO) {

		const { data } = await getAxiosInstance('/posts').post('/unique', postDTO);

		return data;

	},
	
	async updateReview(postDTO) {

		const { data } = await getAxiosInstance('/posts').put('/review', postDTO);

		return data;

	},

	async fetchPostsforReview() {

		const { data } = await getAxiosInstance('/posts').get('/postsReview');

		return data;

	},

	async fetchReviewBlogPostBySlug(slug) {

		console.log(slug);

		const { data } = await getAxiosInstance('/posts').get('/reviewBlogPostSlug/' + slug);

		return data;

	}

}