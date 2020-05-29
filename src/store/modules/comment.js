import CommentService from '@/services/comment';

export default {

	namespaced: true,

	state: {

		postComments: []

	},

	mutations: {

		UPDATE_COMMENT(state, comment) {

			state.postComments = comment;

		}

	},

	getters: {

	},

	actions: {

		async create (context, postDTO) {

			await CommentService.create(postDTO);

		},

		async setPostCommentsById({ commit }, id) {

			const { postComments } = await CommentService.getPostCommentsById(id);

			commit('UPDATE_COMMENT', postComments);
		},

		async addReply(context, postDTO) {

			await CommentService.addreply(postDTO); 

		},

		async addLike (context, postDTO) {

			await CommentService.addLike(postDTO);

		}

	}

}