import PostService from '@/services/post';

export default {

	namespaced: true,
	
	state: {

		publishedPost: false,
		publishedPosts: [],

	},

	mutations: {

		SET_PUBLISHED_POSTS(state, posts) {
			state.publishedPosts = posts;
		},

		SET_PUBLISHED_POST(state, post) {
			state.publishedPost = post;
		}

	},

	getters: {

	},

	actions: {

		async setPublishedPosts({ commit }) {

			try {

				let { code, posts } = await PostService.fetchPublishedPosts();

				if (code === 0) {
					commit('SET_PUBLISHED_POSTS', posts);
				}
					
			} catch (error) {
				return { code: 1, error: error };
			}

		},

		async setPublishedPost({ commit }, id) {

			try {

				let { code, post } = await PostService.fetchPublishedPost(id);

				if (code === 0) {
					commit('SET_PUBLISHED_POST', post);
				}

			} catch (error) {
				return { code: 1, error: error };
			}

		}
 
	}

}