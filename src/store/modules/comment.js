import CommentService from '@/services/comment';

export default {

	namespaced: true,

	state: {

		comments: []

	},

	mutations: {

		UPDATE_COMMENT(state, comment) {

			state.comments = comment

		}

	},

	getters: {

	},

	actions: {

		async create (context, postDTO) {

			await CommentService.create(postDTO);

		},

		setComment({ commit }) {

			const { comment } = await CommentService.fetchPostComments();

			commit('UPDATE_COMMENT', comment);
		}

	}

}