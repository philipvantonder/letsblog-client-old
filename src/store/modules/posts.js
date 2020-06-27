import PostService from '@/services/post';

export default {

	namespaced: true,
	
	state: {

		blogPosts: [] // this store all realted blog post(s) data

	},

	mutations: {

		SET_BLOG_POSTS(state, post) {
			state.blogPosts = post;
		},

		REMOVE_USER_POST(state, id) {
			let post_index = state.blogPosts.map(post => post._id).indexOf(id);
			state.blogPosts.splice(post_index, 1);
		},

	},

	getters: {

	},

	actions: {

		async setPublishedBlogPosts({ commit }) {

			const { posts } = await PostService.fetchPublishedBlogPosts();

			commit('SET_BLOG_POSTS', posts);

		},

		async setBlogPostBySlug({ commit }, id) {

			const { post } = await PostService.fetchBlogPostBySlug(id);

			commit('SET_BLOG_POSTS', post);

		},

		
		async setUserPosts({ commit }) {

			let { posts } = await PostService.fetchUserPosts();
			
			commit('SET_BLOG_POSTS', posts);
			
		},
		
		async removePost({ commit }, id) {
			
			await PostService.delete(id);
			
			commit('REMOVE_USER_POST', id);
			
		},
		
		async setPost({ commit }, id) {
			
			const { post } = await PostService.fetchPost(id);
			
			commit('SET_BLOG_POSTS', post);
			
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
		
		async setPostsforReview({ commit }) {
			
			const { posts } = await PostService.fetchPostsforReview();
			
			commit('SET_BLOG_POSTS', posts);
			
		},

		async setReviewBlogPostBySlug({ commit }, id) {
	
			const { post } = await PostService.fetchReviewBlogPostBySlug(id);

			commit('SET_BLOG_POSTS', post);
	
		},
		
	}
	
}