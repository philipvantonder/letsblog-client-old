import CommentService from '@/services/comment';

export default {

	namespaced: true,

	state: {

		postComments: [],
		userCommentLikes: []

	},

	mutations: {

		UPDATE_COMMENT(state, comment) {
			state.postComments = comment;
		},
		
		UPDATE_USER_COMMENT_LIKES(state, likes) {
			state.userCommentLikes = likes;
		}

	},

	getters: {

	},

	actions: {

		async create (context, postDTO) {

			await CommentService.create(postDTO);

		},

		async setPostCommentsById({ commit }, id) {

			const { postComments } = await CommentService.fetchPostCommentsById(id);

			commit('UPDATE_COMMENT', postComments);
		},

		async addReply(context, postDTO) {

			await CommentService.addreply(postDTO); 

		},

		async addLike(context, postDTO) {

			await CommentService.addLike(postDTO);

		},

		async getUserCommentLikes({ commit }) {

			const { likes } = await CommentService.fetchUserCommentLikes();

			commit('UPDATE_USER_COMMENT_LIKES', likes);
	
		}

	}

}