
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
	
		isModerator(state) {

			if (state.userRoles.includes('moderator')) {
				return true;
			}
			
			return false;

		},

		isAdmin(state) {

			if (state.userRoles.includes('admin')) {
				return true;
			}
			
			return false;

		}

	},

	actions: {

		async getUserRoles({ commit }) {

			const { userRoles } = await userRolesService.fetchUserRoles();

			commit('UPDATE_USER_ROLES', userRoles);

		}

	}

}