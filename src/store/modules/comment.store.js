import CommentService from '@/services/comment';

export default {

	namespaced: true,

	state: {

		postComments: [],
		userCommentLikes: [],
		totalComments: ''

	},

	mutations: {

		UPDATE_COMMENT(state, comment) {
			state.postComments = comment;
		},
		
		UPDATE_USER_COMMENT_LIKES(state, likes) {
			state.userCommentLikes = likes;
		},

		UPDATE_TOTAL_COMMENT(state, totalComments) {
			state.totalComments = totalComments;
		}

	},

	getters: {

	},

	actions: {

		async create (context, postDTO) {

			await CommentService.create(postDTO);

		},

		async setPostCommentsById({ commit }, id) {

			const { postComments, totalComments } = await CommentService.fetchPostCommentsById(id);

			commit('UPDATE_COMMENT', postComments);
			commit('UPDATE_TOTAL_COMMENT', totalComments);
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