import PostService from '@/services/post';

export default {

	namespaced: true,
	
	state: {

		blogPost: false, // Viewing of single post in public feed
		publishedBlogPosts: [], // Published posts for public feed
		userPosts: [], // All user posts
		post: false, // Editing of a single user post

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
			state.post = post
		}

	},

	getters: {

	},

	actions: {

		async setPublishedBlogPosts({ commit }) {

			try {

				let { code, posts } = await PostService.fetchPublishedBlogPosts();

				if (code === 0) {
					commit('SET_PUBLISHED_BLOG_POSTS', posts);
				}
					
			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setBlogPost({ commit }, id) {

			try {

				let { code, post } = await PostService.fetchBlogPost(id);

				if (code === 0) {
					commit('SET_BLOG_POST', post);
				}

				return { code }

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setUserPosts({ commit }) {

			try {

				let { code, posts } = await PostService.fetchUserPosts();

				if (code === 0) {
					commit('SET_USER_POSTS', posts);
				}
				
			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async removePost({ commit }, id) {

			try {

				let { code } = await PostService.delete(id);

				if (code === 0) {
					commit('REMOVE_USER_POST', id);
				}

				return { code };

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setPost({ commit }, id) {

			try {

				let { code, post } = await PostService.fetchPost(id);

				if (code === 0) {
					commit('SET_POST', post);
				}

				return { code };

			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async createPost(context, post) {

			try {

				let { code } = await PostService.create(post);
	
				return { code };

			} catch (error) {
				return { code: 1, error: error };
			}
			
		},
		
		async updatePost(contex, postDTO) {
			
			try {

				let { id, post } = postDTO;

				let { code } = await PostService.update(id, post);

				return { code };
				
			} catch (error) {
				return { code: 1, error: error };
			}

		}
 
	}

}