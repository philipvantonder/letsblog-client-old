import PostService from '@/services/post';

export default {

	namespaced: true,
	
	state: {

		blogPost: false, // Viewing of single post in public feed
		publishedBlogPosts: [], // Published posts for public feed
		userPosts: [], // All user posts
		post: false, // Editing of a single user post,

	},

	mutations: {

		SET_BLOG_POST(state, post) {
			state.blogPost = post;
		},

		SET_PUBLISHED_BLOG_POSTS(state, posts) {
			state.publishedBlogPosts = posts;
		},

		SET_USER_POSTS(state, posts) {
			state.userPosts = posts;
		},

		REMOVE_USER_POST(state, id) {
			let post_index = state.userPosts.map(post => post._id).indexOf(id);
			state.userPosts.splice(post_index, 1);
		},

		SET_POST(state, post) {
			state.post = post;
		}

	},

	getters: {

	},

	actions: {

		async setPublishedBlogPosts({ commit }) {

			const { posts } = await PostService.fetchPublishedBlogPosts();

			commit('SET_PUBLISHED_BLOG_POSTS', posts);

		},

		async setBlogPostBySlug({ commit }, id) {

			const { post } = await PostService.fetchBlogPostBySlug(id);

			commit('SET_BLOG_POST', post);

		},

		async setUserPosts({ commit }) {

			let { posts } = await PostService.fetchUserPosts();

			commit('SET_USER_POSTS', posts);

		},

		async removePost({ commit }, id) {

			await PostService.delete(id);

			commit('REMOVE_USER_POST', id);

		},

		async setPost({ commit }, id) {

			const { post } = await PostService.fetchPost(id);

			commit('SET_POST', post);


		},

		async createPost(context, post) {

			await PostService.create(post);
			
		},
		
		async updatePost(contex, postDTO) {
			
			const { id, post } = postDTO;

			await PostService.update(id, post);

		},

		async checkUnique(context, postDTO) {

			const { newSlug } = await PostService.checkUnique(postDTO);

			return { newSlug };

		},

		async updateReview(context, postDTO) {

			await PostService.updateReview(postDTO);

		},

		async getPostsforReview() {

			const { posts } = await PostService.fetchPostsforReview();

			return posts;

		}
 
	}

}