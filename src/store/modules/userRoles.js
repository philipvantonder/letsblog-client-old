
import userRolesService from '@/services/userRoles';

export default {

	namespaced: true,

	state: {
		userRoles: []
	},

	mutations: {

		UPDATE_USER_ROLES(state, userRoles) {
			state.userRoles = userRoles
		}

	},

	getters: {
	
	},

	actions: {

		async getUserRoles({ commit }) {

			const { userRoles } = await userRolesService.fetchUserRoles();

			commit('UPDATE_USER_ROLES', userRoles);

		}

	}

}